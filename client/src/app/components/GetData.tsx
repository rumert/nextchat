

{/* const colRef = collection(db, "books")



function GetData() {

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(colRef);
      snapshot.forEach((doc) => {
        let books: any = []
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)  
      });
    } catch (err) {
      console.error('firebase error:', err);
    }
  };

  fetchData();

  return (
    <div>
      
    </div>
  )
}

export default GetData */}
