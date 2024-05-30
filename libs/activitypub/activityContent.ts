

export const activityContent = (articleTitle: string, articleId :string) => {
  return `<p>ブログを更新しました: ${articleTitle}<br><a href="https://blog.nekozuki.me/${articleId}">https://blog.nekozuki.me/${articleId}</p>`
}