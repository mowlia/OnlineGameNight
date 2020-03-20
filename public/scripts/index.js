db.collection("KodeNames").doc("1111").get().then(function(doc){
  console.log(doc.data())
})