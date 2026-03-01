import React, { useEffect, useState } from "react";

/* ---------- IMAGES (NO leading / ) ---------- */
const heroImages = [
  "images/shop.jpg",
  "images/nuts1.jpg",
  "images/drinks1.jpg",
  "images/chocolates1.jpg",
  "images/chocolates2.jpg",
  "images/chocolates3.jpg",
];

const products = [
  { id: 1, name: "Ajwa Dates", price: "₹899 / kg", img: "images/alwa.jpg" },
  { id: 2, name: "Almonds (Badam)", price: "₹799 / kg", img: "images/almonds.jpg" },
  { id: 3, name: "Cashew Nuts", price: "₹899 / kg", img: "images/cashew.jpg" },
  { id: 4, name: "Pistachios", price: "₹1,199 / kg", img: "images/pista.jpg" },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [showOrder, setShowOrder] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          <a href="#products" style={styles.navLink}>Products</a>
          <a href="#gallery" style={styles.navLink}>Gallery</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <img
          src={heroImages[current]}
          alt="Hero"
          style={{ ...styles.heroImage, opacity: fade ? 1 : 0 }}
        />
        <div style={styles.heroOverlay}>
          <h2>Premium Dates & Dry Fruits</h2>
          <p>Fresh • Healthy • Premium Quality</p>
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
              <button
                style={styles.orderBtn}
                onClick={() => {
                  setSelectedProduct(p);
                  setShowOrder(true);
                }}
              >
                Order Now
              </button>
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
        <p>📍 club road, RPC Layout, Vijayanagar, Bengaluru, Karnataka</p>
        <p>📞 +91 09538347891</p>
        <p>© 2026 Maruthi Dates & Nuts</p>
      </footer>

      {/* ORDER POPUP */}
      {showOrder && (
        <div style={styles.orderOverlay}>
          <div style={styles.orderBox}>
            <h2>Place Order</h2>

            <p><strong>Product:</strong> {selectedProduct?.name}</p>
            <p><strong>Price:</strong> {selectedProduct?.price}</p>

            <input style={styles.input} placeholder="Your Name" />
            <input style={styles.input} placeholder="Mobile Number" />
            <textarea
              style={styles.input}
              rows="3"
              placeholder="Delivery Address"
            />

            <h3 style={{ marginTop: "10px" }}>Choose Payment</h3>

            {/* PAYTM */}
            <a
              href="https://paytm.me/YOURPAYTMLINK"
              target="_blank"
              rel="noreferrer"
              style={styles.paytmBtn}
            >
              Pay with Paytm
            </a>

            {/* CARD / WHATSAPP */}
            <a
              href="https://wa.me/91XXXXXXXXXX?text=I%20want%20to%20order%20from%20Maruthi%20Dates%20%26%20Nuts"
              target="_blank"
              rel="noreferrer"
              style={styles.cardBtn}
            >
              Credit / Debit Card
            </a>

            <button
              style={styles.closeBtn}
              onClick={() => setShowOrder(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  app: { fontFamily: "Arial, sans-serif", color: "#333" },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "#7b3f00",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: { margin: 0 },

  nav: {
    display: "flex",
    gap: "20px",
  },

  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },

  hero: { position: "relative", height: "70vh", overflow: "hidden" },

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
  },

  section: { padding: "60px 30px", textAlign: "center" },

  sectionAlt: {
    padding: "60px 30px",
    background: "#faf6f2",
    textAlign: "center",
  },

  sectionTitle: { marginBottom: "30px", fontSize: "28px" },

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
  },

  cardImg: {
    width: "100%",
    height: "170px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  price: { fontWeight: "bold", color: "#7b3f00" },

  orderBtn: {
    marginTop: "10px",
    padding: "10px",
    background: "#ff9800",
    border: "none",
    borderRadius: "6px",
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
  },

  footer: {
    background: "#2b2b2b",
    color: "white",
    padding: "25px",
    textAlign: "center",
  },

  /* ORDER MODAL */
  orderOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },

  orderBox: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  paytmBtn: {
    display: "block",
    marginTop: "10px",
    padding: "12px",
    background: "#00b9f1",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
  },

  cardBtn: {
    display: "block",
    marginTop: "8px",
    padding: "12px",
    background: "#444",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
  },

  closeBtn: {
    marginTop: "15px",
    padding: "8px 16px",
    background: "#eee",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};