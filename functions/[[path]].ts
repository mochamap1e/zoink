export function onRequest(context) {
    const url = new URL(context.request.url)
    
    if (url.hostname === "zoink.pages.dev") {
        return Response.redirect("https://zoink.gd", 301)
    }
    
    return context.next()
}