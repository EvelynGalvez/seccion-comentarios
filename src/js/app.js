document.getElementById('form').addEventListener('submit', (e) => {
  let publication = document.getElementById('comment').value;
  e.preventDefault();
  createPost(publication);
  form.reset();
})

let d = new Date();
let t = d.getTime();
let counter = t;

const createPost = (publication) => {
  counter+=1;
  let post = {
    id: counter,
    comment: publication
  };

  let db = firebase.database().ref('commentCollection/'+counter);
  db.set(post);
  document.getElementById('container-comments').innerHTML= '';
  readPublication();
}

const readPublication = () => {
  let commentCollection = firebase.database().ref('commentCollection/');
  commentCollection.on('child_added', function(data){
    let commentCollectionValue = data.val(); 
    document.getElementById('container-comments').innerHTML += '<div class="font contenedorDeComentarios">'+ commentCollectionValue.comment + '<a href="#" class="btn-delete badge badge-danger" onclick="deletePost('+commentCollectionValue.id+')"><i class="fas fa-trash-alt"></i></a>'+'</div>'
});
}

const deletePost = (id) => {
  let commentCollection = firebase.database().ref('commentCollection/' + id);
  commentCollection.remove();
  location.reload();
}
