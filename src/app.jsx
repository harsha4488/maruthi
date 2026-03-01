import React, { useEffect, useState } from "react";

/* ---------- IMAGES ---------- */
const heroImages = [
  "images/shop.jpg",
  "images/nuts1.jpg",
  "images/drinks1.jpg",
  "images/chocolates1.jpg",
  "images/chocolates2.jpg",
  "images/chocolates3.jpg",
];

const products = [
  { id: 1, name: "Ajwa Dates", pricePerKg: 899, img: "images/alwa.jpg" },
  { id: 2, name: "Almonds (Badam)", pricePerKg: 799, img: "images/almonds.jpg" },
  { id: 3, name: "Cashew Nuts", pricePerKg: 899, img: "images/cashew.jpg" },
  { id: 4, name: "Pistachios", pricePerKg: 1199, img: "images/pista.jpg" },
];

const weights = [
  { label: "250 g", value: 0.25 },
  { label: "500 g", value: 0.5 },
  { label: "750 g", value: 0.75 },
  { label: "1 kg", value: 1 },
  { label: "2 kg", value: 2 },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [selectedWeights, setSelectedWeights] = useState({});
  const [changeMode, setChangeMode] = useState({});

  /* ---------- HERO ROTATION ---------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((p) => (p + 1) % heroImages.length);
        setFade(true);
      }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /* ---------- CART LOGIC ---------- */
  const addToCart = (product) => {
    const weight = selectedWeights[product.id];
    if (!weight) return alert("Please select quantity");

    const key = `${product.id}-${weight}`;
    setCart((prev) => ({
      ...prev,
      [key]: {
        product,
        weight,
        qty: (prev[key]?.qty || 0) + 1,
      },
    }));
    setChangeMode((p) => ({ ...p, [product.id]: false }));
  };

  const cartItems = Object.values(cart);
  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = Math.round(
    cartItems.reduce(
      (s, i) => s + i.qty * i.weight * i.product.pricePerKg,
      0
    )
  );

  const isAdded = (pid, w) => !!cart[`${pid}-${w}`];

  /* ---------- RAZORPAY ---------- */
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const payWithRazorpay = async () => {
    if (!totalPrice) return alert("Cart is empty");

    const loaded = await loadRazorpay();
    if (!loaded || !window.Razorpay)
      return alert("Razorpay failed to load");

    const options = {
      key: "RAZORPAY_TEST_KEY_HERE", // 👈 replace with your test key
      amount: totalPrice * 100,
      currency: "INR",
      name: "Maruthi Dates & Nuts",
      description: "Dry Fruits Order",
      handler: (res) =>
        alert("Payment successful: " + res.razorpay_payment_id),
      theme: { color: "#7b3f00" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div style={styles.app}>
      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>Maruthi Dates & Nuts</h1>
          <small style={styles.tagline}>Premium Dry Fruits Boutique</small>
        </div>
        <button style={styles.cartBtn} onClick={() => setShowCart(true)}>
          🛒 Cart <span style={styles.badge}>{totalQty}</span>
        </button>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <img
          src={heroImages[current]}
          alt="Hero"
          style={{ ...styles.heroImage, opacity: fade ? 1 : 0 }}
        />
        <div style={styles.heroOverlay}>
          <h2 style={styles.heroTitle}>Naturally Premium</h2>
          <p style={styles.heroSub}>
            Hand-selected dates & dry fruits, crafted for quality
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Signature Selection</h2>
        <div style={styles.grid}>
          {products.map((p) => {
            const w = selectedWeights[p.id];
            const added = w && isAdded(p.id, w);
            const changing = changeMode[p.id];

            return (
              <div key={p.id} style={styles.card}>
                <img src={p.img} alt={p.name} style={styles.cardImg} />
                <h3>{p.name}</h3>
                <p style={styles.price}>₹{p.pricePerKg} / kg</p>

                {!added || changing ? (
                  <>
                    <select
                      style={styles.select}
                      value={w || ""}
                      onChange={(e) =>
                        setSelectedWeights({
                          ...selectedWeights,
                          [p.id]: Number(e.target.value),
                        })
                      }
                    >
                      <option value="">Select Quantity</option>
                      {weights.map((x) => (
                        <option key={x.value} value={x.value}>
                          {x.label}
                        </option>
                      ))}
                    </select>
                    <button style={styles.addBtn} onClick={() => addToCart(p)}>
                      Add to Cart
                    </button>
                  </>
                ) : (
                  <>
                    <p style={styles.addedText}>✔ Added</p>
                    <div style={styles.btnRow}>
                      <button
                        style={styles.viewBtn}
                        onClick={() => setShowCart(true)}
                      >
                        View Cart
                      </button>
                      <button
                        style={styles.changeBtn}
                        onClick={() =>
                          setChangeMode({ ...changeMode, [p.id]: true })
                        }
                      >
                        Change
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* GALLERY */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>Gallery</h2>
        <div style={styles.gallery}>
          {heroImages.map((img, i) => (
            <img key={i} src={img} alt="Gallery" style={styles.galleryImg} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <h3>Maruthi Dates & Nuts</h3>
        <p>📍 Vijayanagar, Bengaluru</p>
        <p>📞 +91 95383 47891</p>
        <p style={{ opacity: 0.6 }}>© 2026 All rights reserved</p>
      </footer>

      {/* CART */}
      {showCart && (
        <div style={styles.overlay}>
          <div style={styles.cartBox}>
            <h2>Order Summary</h2>

            {cartItems.map((i, idx) => (
              <div key={idx} style={styles.cartItem}>
                <span>
                  {i.product.name} ({i.weight} kg)
                </span>
                <span>
                  ₹{Math.round(i.qty * i.weight * i.product.pricePerKg)}
                </span>
              </div>
            ))}

            <h3 style={{ marginTop: 15 }}>Total ₹{totalPrice}</h3>

            <button style={styles.razorBtn} onClick={payWithRazorpay}>
              Pay with Razorpay
            </button>

            <a
              href="https://paytm.me/YOURPAYTMLINK"
              target="_blank"
              rel="noreferrer"
              style={styles.paytmBtn}
            >
              Pay with Paytm
            </a>

            <button style={styles.closeBtn} onClick={() => setShowCart(false)}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  app: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    background: "#fdfaf6",
    color: "#3a2a1a",
  },

  header: {
    background: "linear-gradient(90deg, #5c2d00, #9c5a12)",
    color: "white",
    padding: "18px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  logo: { margin: 0 },
  tagline: { fontSize: "12px", opacity: 0.85 },

  cartBtn: {
    background: "white",
    color: "#5c2d00",
    padding: "10px 18px",
    borderRadius: "30px",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  },

  badge: {
    background: "#5c2d00",
    color: "white",
    padding: "2px 8px",
    borderRadius: "10px",
    marginLeft: "6px",
    fontSize: "12px",
  },

  hero: { height: "75vh", position: "relative" },
  heroImage: { width: "100%", height: "100%", objectFit: "cover" },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.25))",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  heroTitle: { fontSize: "44px", marginBottom: "10px" },
  heroSub: { fontSize: "18px" },

  section: { padding: "80px 30px", textAlign: "center" },
  sectionAlt: { padding: "80px 30px", background: "#f1e9df" },
  sectionTitle: { fontSize: "32px", marginBottom: "40px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "35px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },

  cardImg: {
    width: "100%",
    height: "190px",
    objectFit: "cover",
    borderRadius: "14px",
    marginBottom: "12px",
  },

  price: { color: "#9c5a12", fontWeight: 600 },

  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    marginTop: "10px",
  },

  addBtn: {
    marginTop: "12px",
    padding: "12px",
    width: "100%",
    background: "#5c2d00",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
  },

  addedText: { marginTop: "12px", color: "#2e7d32", fontWeight: 600 },

  btnRow: { display: "flex", gap: "10px", marginTop: "12px" },

  viewBtn: {
    flex: 1,
    padding: "10px",
    background: "#5c2d00",
    color: "white",
    border: "none",
    borderRadius: "10px",
  },

  changeBtn: {
    flex: 1,
    padding: "10px",
    background: "#eee",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },

  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "25px",
  },

  galleryImg: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "16px",
  },

  footer: {
    background: "#2b1b0f",
    color: "white",
    padding: "50px 20px",
    textAlign: "center",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  cartBox: {
    background: "white",
    padding: "30px",
    borderRadius: "18px",
    width: "90%",
    maxWidth: "420px",
  },

  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  razorBtn: {
    marginTop: "16px",
    padding: "14px",
    background: "#2b7cff",
    color: "white",
    border: "none",
    borderRadius: "12px",
    width: "100%",
    fontWeight: 600,
    cursor: "pointer",
  },

  paytmBtn: {
    display: "block",
    marginTop: "12px",
    padding: "14px",
    background: "#00b9f1",
    color: "white",
    textAlign: "center",
    textDecoration: "none",
    borderRadius: "12px",
    fontWeight: 600,
  },

  closeBtn: {
    marginTop: "18px",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
};