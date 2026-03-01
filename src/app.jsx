import React, { useEffect, useState } from "react";

const heroImages = [
  "/images/shop.jpg",
  "/images/nuts1.jpg",
  "/images/drinks1.jpg",
  "/images/chocolates1.jpg",
  "/images/chocolates2.jpg",
  "/images/chocolates3.jpg",
];

const products = [
  { id: 1, name: "Ajwa Dates", price: "₹899 / kg", img: "/images/alwa.jpg" },
  { id: 2, name: "Almonds (Badam)", price: "₹799 / kg", img: "/images/almonds.jpg" },
  { id: 3, name: "Cashew Nuts", price: "₹899 / kg", img: "/images/cashew.jpg" },
  { id: 4, name: "Pistachios", price: "₹1,199 / kg", img: "/images/pista.jpg" },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.app}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.logo}>Maruthi Dates & Nuts</h1>
        <nav style={styles.nav}>
          <a href="#products">Products</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <img
          src={heroImages[current]}
          alt="Hero"
          style={{
            ...styles.heroImage,
            opacity: fade ? 1 : 0,
          }}
        />
        <div style={styles.heroOverlay}>
          <h2>Premium Dates & Dry Fruits</h2>
          <p>Fresh • Healthy • Premium Quality</p>
          <button style={styles.cta}>Shop Now</button>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Products</h2>
        <div style={styles.grid}>
          {products.map((p) => (
            <div key={p.id} style={styles.card}>
              <img src={p.img} alt={p.name} style={styles.cardImg} />
              <h3>{p.name}</h3>
              <p style={styles.price}>{p.price}</p>
              <button style={styles.paytm}>Pay with Paytm</button>
              <button style={styles.cardBtn}>Credit / Debit Card</button>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>Gallery</h2>
        <div style={styles.gallery}>
          {heroImages.map((img, i) => (
            <img key={i} src={img} alt="Gallery" style={styles.galleryImg} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={styles.footer}>
        <p>📍 Bengaluru, Karnataka</p>
        <p>📞 +91 9XXXXXXXXX</p>
        <p>© 2026 Maruthi Dates & Nuts</p>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "linear-gradient(90deg, #7b3f00, #a05a2c)",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    margin: 0,
    letterSpacing: "1px",
  },

  nav: {
    display: "flex",
    gap: "20px",
  },

  hero: {
    position: "relative",
    height: "70vh",
    overflow: "hidden",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.4s ease-in-out",
  },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    padding: "20px",
  },

  cta: {
    marginTop: "15px",
    padding: "12px 28px",
    fontSize: "16px",
    borderRadius: "25px",
    background: "#ff9800",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
  },

  section: {
    padding: "60px 30px",
    background: "#fff",
    textAlign: "center",
  },

  sectionAlt: {
    padding: "60px 30px",
    background: "#faf6f2",
    textAlign: "center",
  },

  sectionTitle: {
    marginBottom: "30px",
    fontSize: "28px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "white",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },

  cardImg: {
    width: "100%",
    height: "170px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  price: {
    fontWeight: "bold",
    color: "#7b3f00",
  },

  paytm: {
    marginTop: "10px",
    width: "100%",
    background: "#2ecc71",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  cardBtn: {
    marginTop: "6px",
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },

  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "20px",
  },

  galleryImg: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
    transition: "transform 0.3s",
  },

  footer: {
    background: "#2b2b2b",
    color: "white",
    padding: "25px",
    textAlign: "center",
  },
};