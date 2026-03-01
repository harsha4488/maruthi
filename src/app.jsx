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

  /* HERO ROTATION */
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((p) => (p + 1) % heroImages.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  /* ADD TO CART */
  const addToCart = (product) => {
    const weight = selectedWeights[product.id];
    if (!weight) return alert("Please select weight");

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
    const loaded = await loadRazorpay();
    if (!loaded) return alert("Razorpay SDK failed to load");

    const options = {
      key: "RAZORPAY_KEY_HERE", // TEST KEY
      amount: totalPrice * 100,
      currency: "INR",
      name: "Maruthi Dates & Nuts",
      description: "Dry Fruits Order",
      handler: function (response) {
        alert("Payment successful: " + response.razorpay_payment_id);
      },
      theme: { color: "#7b3f00" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div style={styles.app}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1>Maruthi Dates & Nuts</h1>
        <button style={styles.cartBtn} onClick={() => setShowCart(true)}>
          🛒 Cart ({totalQty})
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
          <h2>Premium Dates & Dry Fruits</h2>
          <p>Fresh • Healthy • Premium Quality</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={styles.section}>
        <h2>Our Products</h2>
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
                      <option value="">Select weight</option>
                      {weights.map((x) => (
                        <option key={x.value} value={x.value}>
                          {x.label}
                        </option>
                      ))}
                    </select>
                    <button style={styles.addBtn} onClick={() => addToCart(p)}>
                      Add
                    </button>
                  </>
                ) : (
                  <>
                    <p style={styles.addedText}>
                      {weights.find((x) => x.value === w)?.label} added
                    </p>
                    <div style={styles.btnRow}>
                      <button
                        style={styles.goCartBtn}
                        onClick={() => setShowCart(true)}
                      >
                        Go to Cart
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
        <h2>Gallery</h2>
        <div style={styles.gallery}>
          {heroImages.map((img, i) => (
            <img key={i} src={img} alt="Gallery" style={styles.galleryImg} />
          ))}
        </div>
      </section>

      {/* FOOTER (RESTORED) */}
      <footer style={styles.footer}>
        <p>📍 Club Road, RPC Layout, Vijayanagar, Bengaluru</p>
        <p>📞 +91 95383 47891</p>
        <p>© 2026 Maruthi Dates & Nuts</p>
      </footer>

      {/* CART */}
      {showCart && (
        <div style={styles.overlay}>
          <div style={styles.cartBox}>
            <h2>Your Cart</h2>

            {cartItems.map((i, idx) => (
              <div key={idx} style={styles.cartItem}>
                <span>
                  {i.product.name} ({i.weight} kg)
                </span>
                <span>x {i.qty}</span>
                <span>
                  ₹{Math.round(i.qty * i.weight * i.product.pricePerKg)}
                </span>
              </div>
            ))}

            <h3>Total: ₹{totalPrice}</h3>

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
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  app: { fontFamily: "Arial, sans-serif" },
  header: {
    background: "#7b3f00",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
  },
  cartBtn: { background: "#ff9800", border: "none", padding: "8px 14px" },
  hero: { height: "70vh", position: "relative" },
  heroImage: { width: "100%", height: "100%", objectFit: "cover" },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  section: { padding: "50px 30px", textAlign: "center" },
  sectionAlt: { padding: "50px 30px", background: "#faf6f2" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: "25px",
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  cardImg: { width: "100%", height: "160px", objectFit: "cover" },
  price: { fontWeight: "bold", color: "#7b3f00" },
  select: { width: "100%", padding: "10px", marginTop: "8px" },
  addBtn: {
    marginTop: "10px",
    padding: "10px",
    background: "#ff9800",
    border: "none",
    borderRadius: "6px",
  },
  addedText: { marginTop: "10px", fontWeight: "bold", color: "#2e7d32" },
  btnRow: { display: "flex", gap: "8px", marginTop: "10px" },
  goCartBtn: {
    flex: 1,
    padding: "10px",
    background: "#2b7cff",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  changeBtn: {
    flex: 1,
    padding: "10px",
    background: "#eee",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
    gap: "20px",
  },
  galleryImg: { width: "100%", height: "160px", objectFit: "cover" },
  footer: {
    background: "#2b2b2b",
    color: "white",
    padding: "25px",
    textAlign: "center",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartBox: { background: "white", padding: "25px", width: "90%", maxWidth: "420px" },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  razorBtn: {
    marginTop: "10px",
    padding: "12px",
    background: "#2b7cff",
    color: "white",
    border: "none",
    width: "100%",
  },
  paytmBtn: {
    display: "block",
    marginTop: "10px",
    padding: "12px",
    background: "#00b9f1",
    color: "white",
    textAlign: "center",
    textDecoration: "none",
  },
  closeBtn: { marginTop: "15px", width: "100%" },
};