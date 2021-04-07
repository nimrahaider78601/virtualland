import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import MainSecond from "./MainSecond";
import MenuBar from "../../MenuBar/MenuBar";

function Main() {
  const [bgImage, setBgImage] = useState("");
  const getAccessToken = localStorage.getItem("token");
  const params = useParams();
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;

    let urlall = "http://140.82.28.121:5500/api/booth/getbg";
    let datas = {
      boothId: params.id,
    };

    let optionx = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(datas),
      url: urlall,
    };
    axios(optionx)
      .then((res) => {
        setBgImage(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <React.Fragment>
      <MainSecond text={bgImage} />
    </React.Fragment>
  );
}

export default Main;

// import qs from 'qs';
// import React, { Component } from 'react'
// import axios from 'axios';
// import IntoBooth from './IntoBooth'

// export default class Main extends Component {
//     state={
//         boothgetbg:[]
//       };
//       componentDidMount(){
//         axios.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M`

//         const url = "http://140.82.28.121:5500/api/booth/getbg";
//             let data = {
//               boothId: 21
//             };

//             let options = {
//               method: "POST",
//               headers: { "content-type": "application/x-www-form-urlencoded" },
//               data: qs.stringify(data),
//               url
//             };
//             axios(options)
//               .then(res => {
//                 console.log("LogBgImg",res.data);
//                 this.setState({boothgetbg:res.data})
//               })
//               .catch(er => {
//                 console.log("no data sorry ", er);
//               });
//       }
//     render() {
//       console.log("BGIMG", this.state.boothgetbg);

//         return (
//             <React.Fragment>
//                 <div
//                 style={{background:`url("${this.state.boothgetbg}")`, textAlign:"center"}}
//                 className="into-booth-container">
//                     <IntoBooth/>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }
