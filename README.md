# 📘 Node.js Blog Sistemi - Express.js
Bu proje, Express.js kullanılarak geliştirilmiş bir blog sistemi uygulamasıdır. Dosya sistemi üzerinden veri saklayan bu uygulama,`fs`, `path` ve `events` gibi Node.js core modüllerini de etkin şekilde kullanır. Ayrıca güncelleme ve silme işlemleri eklenmiş ve olay tabanlı log sistemiyle her işlem kayıt altına alınmıştır.

## 🚀 Özellikler
- Blog oluşturma (`POST /create`)

- Blogları listeleme (`GET /blogs`)

- Blog detayını görüntüleme (`GET /blog/:id`)

- Blog güncelleme (`PUT /blog/:id`)

- Blog silme (`DELETE /blog/:id`)

- Olay tabanlı log sistemi (`events`)

- Dosya temelli veri saklama (`fs`)

- Path işlemleri ile platform bağımsız dosya yönetimi (`path`)

- Hata yönetimi ve özel `404` sayfası

## 🧱 Kullanılan Teknolojiler
- `Express.js` – HTTP isteklerini yönetmek için
- `http-status-codes` – Durum kodlarını anlamlı sabitlerle ifade etmek için
- `fs` – Blog içeriklerini dosyalara kaydetmek için
- `path` – Dosya/dizin yollarını yönetmek için
- `events` – Blog işlemleri için olay sistemi
- `uuid` – Bloglara benzersiz ID atamak için

## 📁 Proje Yapısı

```
blog-sistemi/
├── blogs/                          # Blog içeriklerinin tutulduğu .json dosyaları
│   ├── blog-1.json
│   └── blog-2.json
│
├── controllers/
│   └── blogController.js          # HTTP isteklerini yöneten controller katmanı
│
├── logs/
│   └── activity.log               # Blog işlemlerinin log kayıtları
│
├── models/
│   └── BlogManager.js             # Blog işlemleri ve EventEmitter kullanan veri yöneticisi
│       ├── createBlog()
│       ├── readBlog()
│       ├── getAllBlogs()
│       ├── updateBlog()
│       ├── deleteBlog()
│       └── logActivity()
│
├── public/
│   └── 404.html                   # Özel 404 hata sayfası
│
├── routes/
│   └── blogRoutes.js              # API rotaları
│
├── .env                           # Ortam değişkenleri
├── server.js                      # Express sunucusunun başlatıldığı ana dosya
└── README.md                      # Proje dökümantasyonu

```

## ⚙️ Kurulum
```
- git clone https://github.com/MuhammetOkkes/Node.js-Blog-Sistemi-Express.js
- cd blog-sistemi
- npm install  # Bağımlılık yoksa bu adım opsiyoneldir
- node index.js
```

## 📡 API Endpoint’leri
```
| Yöntem | Route       | Açıklama                          |
| ------ | ----------- | --------------------------------- |
| GET    | `/`         | Ana sayfa                         |
| GET    | `/blogs`    | Tüm blogları listeler             |
| GET    | `/blog/:id` | Belirli ID'ye sahip blogu getirir |
| POST   | `/create`   | Yeni bir blog oluşturur           |
| PUT    | `/blog/:id` | Blogu günceller                   |
| DELETE | `/blog/:id` | Blogu siler                       |
```

## ✅ Örnek curl Kullanımı
- **Blog Listeleme:**
```curl http://localhost:3000/blogs```
<br>

- **Belirli Blogu Görüntüleme:**
```curl http://localhost:3000/blog/1```
<br>

- **Yeni Blog Oluşturma:**
```
curl -X POST http://localhost:3000/create \
 -H "Content-Type: application/json" \
 -d '{"title":"Yeni Blog","content":"Bu bir test blogudur."}' 
 ```

- **Blog Güncelleme:**
```
curl -X PUT http://localhost:3000/blog/<id> \
 -H "Content-Type: application/json" \
 -d '{"title":"Güncellenmiş Başlık","content":"Yeni içerik"}'
 ```

- **Blog Silme:**
```
curl -X DELETE http://localhost:3000/blog/<id>
 ```


## 📝 Blog Dosya Yapısı
- Her blog `blogs/` klasöründe .json formatında saklanır:
```
{
  "id": "uuid",
  "title": "Blog Başlığı",
  "content": "Blog içeriği...",
  "date": "2025-08-01T14:23:45.000Z",
  "readCount": 3
}

```

## 🔥 Event Sistemi
BlogManager sınıfı EventEmitter'dan türetilmiştir ve aşağıdaki olayları destekler:
- `blogCreated` – Yeni blog oluşturulduğunda tetiklenir.
- `blogRead` – Blog okunduğunda tetiklenir.
- `blogAllRead` – Tüm bloglar listelendiğinde tetiklenir.
- `blogUpdated` – Blog güncellendiğinde tetiklenir.
- `blogDeleted` – Blog silindiğinde tetiklenir.

Her olay, `logs/activity.log` dosyasına zaman damgası ile birlikte kaydedilir.


## 🌟 Bonus Özellikler
- ✅ Okunma Sayısı Takibi: Bloglar her görüntülendiğinde `readCount` artırılır.
- ✅ Durum Kodlarının Sabitlerle Kullanımı:  
HTTP yanıtlarında `200`, `201`, `404` gibi ham sayıların yerine `http.STATUS_CODES` (sabit isimler: `OK`, `CREATED`, `NOT_FOUND` gibi) kullanılmıştır. Bu sayede: 

- Kodun **anlamı daha açık** hale gelir.  
- **Ekip çalışmasında** hata olasılığı azalır.  
- Bir geliştirici **`201`**'in ne anlama geldiğini bilmese bile **`CREATED`** ifadesiyle ne anlatılmak istendiğini kolayca anlayabilir.


## ❗ Hata Yönetimi
- Geçersiz route’lar için özel `404` sayfası oluşturulmuştur.
- Dosya okuma/yazma hataları `try-catch` ve `fs` hataları ile düzgün yönetilir.
- Eksik veya hatalı ID'ler için kullanıcıya bilgilendirici mesajlar gösterilir.

## 👨‍💻 Developer
###### **İsim: Muhammet Müslüm Ökkeş Kazıcı** 

###### **Email:** kaziciokkes34@gmail.com

###### **GitHub:** github.com/MuhammetOkkes

