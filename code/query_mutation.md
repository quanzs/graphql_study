mutation CreateReviewForEpisode {
  createPost(comment: "Fox in Socks", author: "Dr. Seuss", other: {stars:5}) {
    author {
      name
    }
    comment
  }
}