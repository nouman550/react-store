import React, { Fragment, useState } from "react";
import Header from "./components/Header";
import { toast } from "react-toastify";

const Login = () => {
  const [signInFormData, setSignInFormData] = useState({});
  const [signUpFormData, setSignUpFormData] = useState({ tel_prefix: "+33" });

  const handleTelChange = (text) => (e) => {
    let telNoZero = e.target.value.substring(1);
    if (e.target.value.length === 10) {
      telNoZero = signUpFormData.tel_prefix + e.target.value.substring(1);
      setSignUpFormData({ ...signUpFormData, [text]: telNoZero });
    } else {
      telNoZero = signUpFormData.tel_prefix + e.target.value;
      setSignUpFormData({ ...signUpFormData, [text]: telNoZero });
    }
  };

  const handleSignInFormChange = (text) => (e) => {
    setSignInFormData({ ...signInFormData, [text]: e.target.value });
  };

  const handleSignUpFormChange = (text) => (e) => {
    setSignUpFormData({ ...signUpFormData, [text]: e.target.value });
  };

  const handleSignUpFormSubmit = (e) => {
    e.preventDefault();

    console.log(signUpFormData);

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //     Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    //   },
    //   body: JSON.stringify(signUpFormData),
    // };
    // fetch(`${process.env.REACT_APP_API_URL}/sign-up`, requestOptions)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((res) => {})
    //   .catch((err) => {
    //     toast.warn(
    //       `Une erreur est survenue. Veuillez rafraichir la page ou réessayer ultérieurement.
    //     Si le problème persiste, n'hésitez pas à appeler directement notre restaurant durant nos horaires d'ouverture.`,
    //       {
    //         position: 'top-center',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       }
    //     );
    //     console.log(err);
    //   });
  };

  return (
    <Fragment>
      <div className="container" style={{ paddingTop: "135px" }}>
        <div className="row justify-content-center login-box">
          <div className="col-lg-6">
            <div className="sign_up">
              <div className="head">
                <div className="title">
                  <h3>Connexion</h3>
                </div>
              </div>

              <div className="main_contact">
                <form className="mad-contact-form type-2 var2">
                  <div className="mad-col">
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={handleSignInFormChange("email")}
                      required
                    />
                  </div>
                  <div className="mad-col">
                    <input
                      type="password"
                      placeholder="Mot De Passe "
                      onChange={handleSignInFormChange("password")}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-style-3 btn-small null"
                  >
                    Connexion
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="sign_up">
              <div className="head">
                <div className="title">
                  <h3>Inscription</h3>
                </div>
              </div>

              <div className="main_contact">
                <form
                  className="mad-contact-form type-2 var2"
                  onSubmit={handleSignUpFormSubmit}
                >
                  <div className="mad-col">
                    <input
                      type="text"
                      placeholder="Nom "
                      onChange={handleSignUpFormChange("first_name")}
                      required
                    />
                  </div>
                  <div className="mad-col">
                    <input
                      type="text"
                      placeholder="Prénom "
                      onChange={handleSignUpFormChange("last_name")}
                      required
                    />
                  </div>
                  <div className="mad-col">
                    <input
                      type="email"
                      placeholder="Email "
                      onChange={handleSignUpFormChange("email")}
                      required
                    />
                  </div>
                  <div className="mad-col">
                    <div className="d-flex mb-3 mad-custom-select-2">
                      <select
                        className="me-sm-1 international-phone-number-drop-down"
                        id="prefix"
                        onChange={handleSignUpFormChange("tel_prefix")}
                        required
                      >
                        <option value="+33" defaultValue>
                          🇫🇷 +33
                        </option>
                        <option value="+31">🇳🇱 +31</option>
                        <option value="+32">🇧🇪 +32 </option>
                        <option value="+34">🇪🇸 +34</option>
                        <option value="+39">🇮🇹 +39</option>
                        <option value="+40">🇷🇴 +40</option>
                        <option value="+43">🇦🇹 +43</option>
                        <option value="+45">🇩🇰 +45</option>
                        <option value="+46">🇸🇪 +46</option>
                        <option value="+47">🇳🇴 +47</option>
                        <option value="+48">🇵🇱 +48</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+351">🇵🇹 +351</option>
                        <option value="+354">🇮🇸 +354</option>
                        <option value="+352">🇱🇺 +352</option>
                        <option value="+353">🇮🇪 +353</option>
                        <option value="+356">🇲🇹 +356</option>
                        <option value="+357">🇨🇾 +357</option>
                        <option value="+358">🇫🇮 +358</option>
                        <option value="+359">🇧🇬 +359</option>
                        <option value="+370">🇱🇹 +370</option>
                        <option value="+371">🇱🇻 +371</option>
                        <option value="+372">🇪🇪 +372</option>
                        <option value="+386">🇸🇮 +386</option>
                        <option value="+421">🇸🇰 +421</option>
                        <option value="+423">🇱🇮 +423</option>
                      </select>
                      <div className="tel-input">
                        <input
                          type="number"
                          id="phone"
                          placeholder="Téléphone"
                          onChange={handleTelChange("tel")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mad-col">
                    <input
                      type="password"
                      placeholder="Mot De Passe "
                      onChange={handleSignUpFormChange("password")}
                      required
                    />
                  </div>
                  <div className="mad-col">
                    <input
                      type="password"
                      placeholder="Confirmation du mot de passe "
                      onChange={handleSignUpFormChange("confirm-password")}
                      required
                    />
                  </div>
                  <button className="btn btn-style-3 btn-small null">
                    Inscription
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
