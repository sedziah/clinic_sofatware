export  const   dateFormatter   =   (date)=>{
    const parsedDate = Date.parse(date);
    if (!isNaN(parsedDate)) {

        
    const  dateVar = new Date(parsedDate)?.toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);

    console.log(dateVar,  today);
    if(dateVar  > today){
      console.log('Hi');
    }
  }
}