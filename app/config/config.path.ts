const API_PATH = {
  // api path here
  searchBook: "/search",
  coverUrl: (coverId: string, size?: "S" | "M" | "L") =>
    `https://covers.openlibrary.org/b/id/${coverId}-${size ?? "S"}.jpg`,
}
export default API_PATH
