const data = [
    {
        url: "/demo/instagram/foto1.jpg",
        likes: "316k",
        comments: "3.318",
        description: "Uzak çekim, yol manzarası"
    },
    {
        url: "/demo/instagram/foto2.jpg",
        likes: "245k",
        comments: "1.603",
        description: "Camın üstünde duran bir köpek"
    },
    {
        url: "/demo/instagram/foto3.jpg",
        likes: "1.9M",
        comments: "25.211",
        description: "Şato veya kule"
    },
    {
        url: "/demo/instagram/foto4.jpg",
        likes: "542k",
        comments: "9.318",
        description: "Bulutlu gökyüzü"
    },
    {
        url: "/demo/instagram/foto5.jpg",
        likes: "1.3M",
        comments: "643",
        description: "Manzara ve At"
    },
    {
        url: "/demo/instagram/foto6.jpg",
        likes: "16k",
        comments: "33.478",
        description: "Kıvrık  yol ve manzara"
    },
]
export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}