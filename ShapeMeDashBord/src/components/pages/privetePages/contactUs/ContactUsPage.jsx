import React from "react";
import ContactUs from "./ContactUs";
import Loading from "../../../../util/Loading";
import useFetch from "../../../../hooks/useFetch";

const url = "http://localhost:3000/contactUs/getAll";

function ContactUsPage() {
  const [data, isLoading, isError] = useFetch(`${url}/getAll`);

  return (
    <div>
      {!data && <div className="dark:text-white">No compalints</div>}

      {isLoading && (
        <div className="flex justify-center items-center h-[50%]">
          <Loading />
        </div>
      )}

      {isError && <div>{isError}</div>}

      {data && <ContactUs data={data} />}
    </div>
  );
}

export default ContactUsPage;
