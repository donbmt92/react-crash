import classes from './Post.module.css';

// const names = ['Maximilian', 'Manual'];

// function add(a, b) {
//     return a + b;
//   }

function Post({author,body}) {
  return (
    <div className={classes.post}>
      <p className={classes.author}>{author}</p>
      <p className={classes.text}>{body}</p>
    </div>
  );
}

export default Post;
