const API_PATH = {
  // api path here
  // @demo remove-block-start
  listUsers: "/users",
  user: "/user",
  listResources: "/unknown",
  // @demo remove-block-end
  searchBook: "/search",
  coverUrl: (coverId: string, size?: "S" | "M" | "L") =>
    `https://covers.openlibrary.org/b/id/${coverId}-${size ?? "S"}.jpg`,
}
export default API_PATH
