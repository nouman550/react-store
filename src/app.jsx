import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./screens/Menu/Menu";
import Contact from "./screens/contact";
import Checkout from "./screens/Checkout";
import NotFound from "./screens/NotFound";
import Footer from "./screens/components/Footer";
import ValidatePayPlugPayment from "./screens/ValidatePayPlugPayment";
import ValidatePayPalPayment from "./screens/ValidatePayPalPayment";
import DownloadApp from "./screens/components/DownloadApp";
import Login from "./screens/Login";
import ThankYou from "./screens/ThankYou";
import Header from "./screens/components/Header";
import PayPalButton from "./PayPalButton";

const App = () => {
  const scrollRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const scrollThreshold = 250;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(scrollRef.current.scrollTop > 0 ? true : false);

      if (
        scrollRef.current.scrollTop > lastScrollY &&
        scrollRef.current.scrollTop > scrollThreshold
      ) {
        // Scroll down
        setShowHeader(false);
      } else {
        // Scroll up
        setShowHeader(true);
      }
      setLastScrollY(scrollRef.current.scrollTop);
    };

    const scrollElement = scrollRef.current;
    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div ref={scrollRef} className="scroll-content-wrp">
      <div id="container">
        {/* <DownloadApp /> */}

        <BrowserRouter basename="/">
          <Header
            key={1}
            showHeader={showHeader}
            isScrolled={isScrolled || false}
          />
          <Routes>
            <Route path="/" exact element={<Home showText={showHeader} />} />
            <Route path="/menu" exact element={<Menu />} />
            <Route
              path="/contact"
              exact
              element={<Contact scrollY={lastScrollY} />}
            />
            <Route path="/checkout" exact element={<Checkout />} />
            <Route
              path="/validate-pay-plug-payment"
              exact
              element={<ValidatePayPlugPayment />}
            />
            <Route
              path="/validate-pay-pal-payment"
              exact
              element={<ValidatePayPalPayment />}
            />
            <Route path="/login" exact element={<Login />} />
            <Route path="/thank-you" exact element={<ThankYou />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
