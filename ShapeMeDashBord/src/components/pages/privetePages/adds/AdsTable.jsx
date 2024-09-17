import React, {
  useEffect,
  lazy,
  useState,
  startTransition,
  Suspense,
  useContext,
} from "react";
import axios from "axios";
import BudyBuild from "../products/table/BudyBuild";
import RowBuild from "../products/table/RowBuild";
import HeadBuild from "../products/table/HeadBuild";
import Buttons from "../products/table/Buttons"; // page for buttons style
import {
  redBtn,
  blueBtn,
  limeBtn,
} from "../products/table/styles/ButtonStyles";
import AdsForm from "./AdsForm";
import BodyBuildAds from "./BodyBuildAds";
import OrderPreview from "../orders/OrderPreview";
function AdsTable() {
  const url = "http://localhost:3000/ads";
  const [fetchAds, setFetchtAds] = useState(null);
  const [ads, setAds] = useState(null);
  const [ad, setAd] = useState(null);
  const getAds = async () => {
    try {
      const response = await axios.get(`${url}/myAds`);
      setAds(response.data.ads);
    } catch (error) {
      console.log(error);
    }
  };
  const updateMyad = async (data, url, method) => {
    try {
      const response = await axios({
        method,
        url,
        data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setFetchtAds((prev) => !prev);
    }
  };
  const show = (ad) => {
    setAd(ad);
    document.getElementById("my_modal_1").showModal();
  };
  const deleteAd = (id) => {
    try {
      const response = axios({
        method: "delete",
        url: `${url}/deleteAd/${id}`,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchtAds((prev) => !prev);
    }
  };
  useEffect(() => {
    getAds();
  }, [fetchAds]);

  const TABLE_HEAD = ["Name", "Ad"];
  const [table, setTabel] = useState([]);
  const [searchAd, setSearchAds] = useState(null);

  return (
    <div id="page" className="h-[80vh] flex justify-center  w-full">
      <div className="w-full">
        <div className="w-[50%] flex mx-auto">
          <div className="text-right w-[40%] mb-5 mx-auto">
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="text"
                class="grow"
                placeholder="Search"
                id="search"
                onChange={(e) => {
                  // function to filter the table by product name note* need to check if using localStorage
                  // is needed
                  setSearchAds(ads.filter((p) => p.Name.match(e.target.value)));
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="text-right w-[10%] mb-5">
            <Buttons
              styles={blueBtn}
              value="Add"
              onClick={() => {
                setAd(null);
                document.getElementById("my_modal_1").showModal();
              }}
            />
          </div>
        </div>

        <div className="my_table">
          <table className="w-[40%] mx-auto min-w-max table-auto text-left">
            <thead>
              <tr key="cbbbb ">
                {TABLE_HEAD.map((head, index) => (
                  <HeadBuild value={head} ma={index} />
                ))}
                <HeadBuild value="Action" ma={10} />
              </tr>
            </thead>
            <BodyBuildAds
              budy={searchAd ?? ads}
              show={show}
              deleteAd={deleteAd}
            />
          </table>
        </div>
        {/* <OrderPreview /> */}
      </div>
      <AdsForm value={TABLE_HEAD} ad={ad} updateMyAd={updateMyad} />
    </div>
  );
}

export default AdsTable;
