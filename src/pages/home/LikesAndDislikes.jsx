const LikesAndDislikes = () => {
    return (
      <div className="relative pl-8">
        {/* Barra verticale rossa */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
        
        <div className="mb-12">
          <h1 className="text-6xl font-normal text-primary mb-6">Likes</h1>
          {/* Area per la lista dei likes - sarà riempita dal cliente */}
        </div>
        
        <div>
          <h1 className="text-6xl font-normal text-primary mb-6">Dislikes</h1>
          {/* Area per la lista dei dislikes - sarà riempita dal cliente */}
        </div>
      </div>
    );
  };
  
  export default LikesAndDislikes;