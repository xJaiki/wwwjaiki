import requests
import pandas as pd
import time
import os
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns

# Configurazione
USER_API_KEY = ''  # La tua chiave API Steam
USER_STEAM_ID = ''  # Il tuo Steam ID
OUTPUT_DIR = os.path.expanduser('~/Desktop/steam_analysis')  # Directory per i risultati

# Crea la directory di output se non esiste
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Funzione per gestire le richieste API con retry e rate limiting
def make_api_request(url, max_retries=3, delay=1):
    for attempt in range(max_retries):
        try:
            response = requests.get(url)
            response.raise_for_status()  # Solleva un'eccezione per risposte HTTP non riuscite
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Tentativo {attempt+1}/{max_retries} fallito: {e}")
            if attempt < max_retries - 1:
                print(f"Riprovo tra {delay} secondi...")
                time.sleep(delay)
                delay *= 2  # Backoff esponenziale
            else:
                print(f"Errore nel recupero dei dati da {url}: {e}")
                return None

# 1. Ottieni la lista completa delle app di Steam
print("Recupero l'elenco completo delle app Steam...")
api_app_list = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/'
app_list_data = make_api_request(api_app_list)

if not app_list_data:
    print("Impossibile recuperare la lista delle app. Uscita.")
    exit(1)

# Crea un dizionario di tutte le app Steam
data_clean = {}
for game in app_list_data['applist']['apps']:
    data_clean[game['appid']] = game['name']

print(f"Recuperate informazioni su {len(data_clean)} app Steam")

# Funzione per ottenere il nome del gioco dato l'ID
def get_name(app_id):
    return data_clean.get(app_id, f"App sconosciuta ({app_id})")

# 2. Funzione migliorata per ottenere recensioni e dettagli supplementari
def get_game_details(app_id):
    # Recupera le recensioni
    reviews_url = f'https://store.steampowered.com/appreviews/{app_id}?json=1'
    reviews_data = make_api_request(reviews_url)
    
    # Inizializza i risultati
    results = {
        'score': None,
        'total_reviews': 0,
        'positive_reviews': 0,
        'negative_reviews': 0,
        'review_score_desc': 'Nessuna recensione'
    }
    
    if reviews_data and 'query_summary' in reviews_data:
        summary = reviews_data['query_summary']
        total = summary.get('total_reviews', 0)
        
        if total > 0:
            positive = summary.get('total_positive', 0)
            results['score'] = positive / total
            results['total_reviews'] = total
            results['positive_reviews'] = positive
            results['negative_reviews'] = total - positive
            results['review_score_desc'] = summary.get('review_score_desc', 'Sconosciuto')
    
    # Recupera dettagli aggiuntivi del gioco
    details_url = f'https://store.steampowered.com/api/appdetails?appids={app_id}'
    details_data = make_api_request(details_url)
    
    if details_data and str(app_id) in details_data and details_data[str(app_id)]['success']:
        data = details_data[str(app_id)]['data']
        results['release_date'] = data.get('release_date', {}).get('date')
        results['genres'] = [genre['description'] for genre in data.get('genres', [])]
        results['categories'] = [cat['description'] for cat in data.get('categories', [])]
        results['price'] = data.get('price_overview', {}).get('final_formatted', 'N/A')
        results['header_image'] = data.get('header_image')
    
    # Aggiungiamo un ritardo per evitare di sovraccaricare le API
    time.sleep(0.5)
    
    return results

# 3. Recupera i giochi posseduti dall'utente
print(f"Recupero i giochi posseduti dall'utente {USER_STEAM_ID}...")
user_url = f'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={USER_API_KEY}&steamid={USER_STEAM_ID}&format=json&include_appinfo=1&include_played_free_games=1'
user_game_data = make_api_request(user_url)

if not user_game_data or 'response' not in user_game_data or 'games' not in user_game_data['response']:
    print("Impossibile recuperare i giochi dell'utente o l'utente non possiede giochi. Uscita.")
    exit(1)

# 4. Raccolta dati dei giochi con informazioni aggiuntive
print(f"Analisi di {len(user_game_data['response']['games'])} giochi posseduti...")
games_data = []

for i, game_info in enumerate(user_game_data['response']['games']):
    app_id = game_info['appid']
    playtime = game_info.get('playtime_forever', 0)  # Tempo di gioco in minuti
    
    # Mostra progresso ogni 10 giochi
    if i % 10 == 0:
        print(f"Elaborazione gioco {i+1}/{len(user_game_data['response']['games'])}...")
    
    # Ottieni il nome del gioco, sia dalle informazioni aggiuntive che dalla lista completa
    game_name = game_info.get('name', get_name(app_id))
    
    # Ottieni dettagli aggiuntivi
    try:
        details = get_game_details(app_id)
        
        # Aggiungi tutti i dati raccolti
        game_data = {
            'app_id': app_id,
            'name': game_name,
            'playtime_minutes': playtime,
            'playtime_hours': round(playtime / 60, 1),
            'user_score': details['score'],
            'total_reviews': details['total_reviews'],
            'review_score_desc': details['review_score_desc'],
            'release_date': details.get('release_date'),
            'genres': ', '.join(details.get('genres', [])),
            'categories': ', '.join(details.get('categories', [])),
            'price': details.get('price'),
            'image_url': details.get('header_image')
        }
        
        games_data.append(game_data)
    except Exception as e:
        print(f"Errore nell'elaborazione del gioco {game_name} (ID: {app_id}): {e}")

# 5. Creazione del DataFrame
df = pd.DataFrame(games_data)

# 6. Pulisci e elabora i dati
# Converti le date in formato datetime
if 'release_date' in df.columns:
    df['release_date'] = pd.to_datetime(df['release_date'], errors='coerce')
    df['release_year'] = df['release_date'].dt.year

# 7. Analisi dei dati
# Calcola statistiche di base
total_games = len(df)
total_playtime_hours = df['playtime_hours'].sum()
average_playtime = df['playtime_hours'].mean()
most_played_game = df.loc[df['playtime_hours'].idxmax()] if not df.empty else None
best_rated_game = df.loc[df['user_score'].idxmax()] if not df.empty and 'user_score' in df else None

# 8. Salva i risultati
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

# Salva il CSV completo
csv_path = os.path.join(OUTPUT_DIR, f'steam_games_analysis_{timestamp}.csv')
df.to_csv(csv_path, index=False, encoding='utf-8-sig')  # utf-8-sig per compatibilità con Excel

# 9. Crea un report di riepilogo
report_path = os.path.join(OUTPUT_DIR, f'steam_analysis_report_{timestamp}.txt')
with open(report_path, 'w', encoding='utf-8') as f:
    f.write("ANALISI DELLA LIBRERIA STEAM\n")
    f.write("==========================\n\n")
    f.write(f"Data analisi: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n")
    f.write(f"Steam ID: {USER_STEAM_ID}\n\n")
    f.write(f"Totale giochi: {total_games}\n")
    f.write(f"Tempo totale di gioco: {total_playtime_hours:.1f} ore\n")
    f.write(f"Tempo medio di gioco: {average_playtime:.1f} ore\n\n")
    
    if most_played_game is not None:
        f.write("GIOCO PIÙ GIOCATO:\n")
        f.write(f"  Nome: {most_played_game['name']}\n")
        f.write(f"  Tempo di gioco: {most_played_game['playtime_hours']:.1f} ore\n")
        f.write(f"  Valutazione: {most_played_game['user_score']*100:.1f}% positive\n\n")
    
    if best_rated_game is not None and not pd.isna(best_rated_game['user_score']):
        f.write("GIOCO MEGLIO VALUTATO (con almeno 100 recensioni):\n")
        top_rated = df[df['total_reviews'] >= 100].sort_values('user_score', ascending=False).head(1)
        if not top_rated.empty:
            game = top_rated.iloc[0]
            f.write(f"  Nome: {game['name']}\n")
            f.write(f"  Valutazione: {game['user_score']*100:.1f}% positive ({game['total_reviews']} recensioni)\n")
            f.write(f"  Tempo di gioco: {game['playtime_hours']:.1f} ore\n\n")
    
    # Top 10 giochi più giocati
    f.write("TOP 10 GIOCHI PIÙ GIOCATI:\n")
    top_played = df.sort_values('playtime_hours', ascending=False).head(10)
    for i, (_, game) in enumerate(top_played.iterrows(), 1):
        f.write(f"  {i}. {game['name']} - {game['playtime_hours']:.1f} ore\n")
    
    f.write("\nTOP 10 GIOCHI MEGLIO VALUTATI (con almeno 100 recensioni):\n")
    top_rated = df[df['total_reviews'] >= 100].sort_values('user_score', ascending=False).head(10)
    for i, (_, game) in enumerate(top_rated.iterrows(), 1):
        if not pd.isna(game['user_score']):
            f.write(f"  {i}. {game['name']} - {game['user_score']*100:.1f}% positive\n")

# 10. Crea visualizzazioni
print("Creazione visualizzazioni...")

# Distribuzione del tempo di gioco
plt.figure(figsize=(12, 6))
sns.histplot(df['playtime_hours'][df['playtime_hours'] > 0], bins=30, kde=True)
plt.title('Distribuzione del tempo di gioco')
plt.xlabel('Ore di gioco')
plt.ylabel('Numero di giochi')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, f'playtime_distribution_{timestamp}.png'))

# Top 10 giochi più giocati
plt.figure(figsize=(14, 8))
top_games = df.sort_values('playtime_hours', ascending=False).head(10)
sns.barplot(x='playtime_hours', y='name', data=top_games)
plt.title('Top 10 giochi più giocati')
plt.xlabel('Ore di gioco')
plt.ylabel('')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, f'top_games_{timestamp}.png'))

# Relazione tra valutazione e tempo di gioco
plt.figure(figsize=(12, 8))
df_filtered = df[df['total_reviews'] >= 50].copy()  # Solo giochi con abbastanza recensioni
df_filtered['review_percent'] = df_filtered['user_score'] * 100
sns.scatterplot(data=df_filtered, x='review_percent', y='playtime_hours', 
                size='total_reviews', sizes=(20, 500), alpha=0.7)
plt.title('Relazione tra valutazione e tempo di gioco')
plt.xlabel('Percentuale recensioni positive')
plt.ylabel('Ore di gioco')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, f'rating_vs_playtime_{timestamp}.png'))

# Giochi per anno di rilascio (se disponibile)
if 'release_year' in df.columns:
    year_counts = df['release_year'].value_counts().sort_index()
    year_counts = year_counts[year_counts.index.notnull()]  # Rimuovi valori nulli
    
    plt.figure(figsize=(14, 6))
    year_counts.plot(kind='bar')
    plt.title('Numero di giochi per anno di rilascio')
    plt.xlabel('Anno')
    plt.ylabel('Numero di giochi')
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, f'games_by_year_{timestamp}.png'))

print(f"\nAnalisi completata! I risultati sono stati salvati in: {OUTPUT_DIR}")
print(f"Report principale: {report_path}")
print(f"Dati completi: {csv_path}")