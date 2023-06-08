import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import axios from "axios";
import PopUp from "../components/Modal/PopUp";
import UpdateChildPopUp from "../components/Modal/UpdateChildPopUp";
import { useTranslation } from "react-i18next";

const ChildDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const childId = location.search.substring(4);
  const [childDetails, setchildDetails] = useState({});
  const [allWorkers, setallWorkers] = useState();
  const [selectedWorker, setselectedWorker] = useState();
  const [openPopUp, setopenPopUp] = useState(false);
  const [popUpDetails, setpopUpDetails] = useState({});
  const [openEditDetails, setopenEditDetails] = useState(false);
  const { t } = useTranslation();

  const updatementorHandler = async () => {
    const response = await axios.post(
      "http://localhost:3000/admin/addchildtoworker",
      {
        child_id: childDetails.child_id,
        user_id: selectedWorker,
      }
    );
    if (response.data.response) {
      setpopUpDetails({
        status: true,
        message: "Worker succesfully updated",
        heading: "Success",
      });
    } else {
      setpopUpDetails({
        status: false,
        message: "Please select a worker to update",
        heading: "Failure",
      });
    }
    setopenPopUp(true);
  };

  useEffect(async () => {
    const response = await axios.post("http://localhost:3000/child/getchild", {
      child_id: childId,
    });
    setchildDetails(response.data.response);
    const response2 = await axios.get(
      "http://localhost:3000/admin/all_workers"
    );
    setallWorkers(response2.data.response);
  }, [openEditDetails]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <div className="flex justify-start items-center mb-7">
        <button
          className="hover:text-slate-500"
          onClick={() => navigate("/cases")}
        >
          <FaArrowLeft />
        </button>
      </div>
      {openEditDetails ? (
        <UpdateChildPopUp
          childDetails={childDetails}
          setopenEditDetails={setopenEditDetails}
        />
      ) : (
        ""
      )}
      {openPopUp ? (
        <PopUp
          setopenPopUp={setopenPopUp}
          status={popUpDetails.status}
          message={popUpDetails.message}
          heading={popUpDetails.heading}
        />
      ) : (
        ""
      )}
      <Header title={t("Child Details")} />
      <div className="p-8 bg-white mt-16 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 pt-10">
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {childDetails && childDetails.child_id}
              </p>
              <p className="text-gray-400">{t("Child ID")}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl capitalize">
                {childDetails && childDetails.caseStatus}
              </p>
              <p className="text-gray-400">{t("Status")}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl capitalize">
                {childDetails && childDetails.gender}
              </p>
              <p className="text-gray-400">{t("Gender")}</p>
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <div>
              <p className="font-bold text-gray-700 text-xl capitalize">
                {childDetails && childDetails.childClassification}
              </p>
              <p className="text-gray-400">{t("Classification")}</p>
            </div>
            <button
              className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 capitalize"
              onClick={() => setopenEditDetails(true)}
            >
              {t("Edit Details")}
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {childDetails && childDetails.childName}{" "}
            <span className="font-light text-gray-500">
              {childDetails && childDetails.age}
            </span>
          </h1>
          <p className="font-light text-lg text-gray-600 mt-3">
            {childDetails && childDetails.shelterHome}
          </p>
          <p className="mt-8 text-gray-500">
            {childDetails && childDetails.district},{" "}
            {childDetails && childDetails.state}
          </p>
        </div>
        <div className="mt-12 flex flex-col">
          {allWorkers && allWorkers.length ? (
            <div>
              <p className="flex justify-start sm:px-16 mt-5 items-center">
                <span className="font-semibold pr-5">
                  {t("Mentor Assigned")} :{" "}
                </span>
                <select
                  className="h-10 border mt-1 rounded px-4 w-1/3 bg-gray-50 ml-5"
                  onChange={(e) => setselectedWorker(e.target.value)}
                >
                  <option value="">Please Select</option>
                  {allWorkers.map((item) => {
                    return <option value={item.user_id}>{item.name}</option>;
                  })}
                </select>
                <button
                  className="text-slate-100 ml-5 hover:bg-green-300 cursor-pointer flex justify-center items-center bg-green-400 px-6 h-10 rounded"
                  onClick={() => updatementorHandler()}
                >
                  <FaSave size={25} />
                  <span className="pl-3 text-lg">Save</span>
                </button>
              </p>
            </div>
          ) : (
            ""
          )}
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Age")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.age}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Date of Birth")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.dateOfBirth}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Recommended For Adoption")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.recommendedForAdoption}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Linked with SAA")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.linkedWithSAA}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 py-2">
            {t("Case History")} :
          </p>
          <p>
            <span className="text-slate-600 font-light lg:mx-16  border-b-2 py-2 pb-5 p-1">
              {childDetails.caseHistory}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Inquiry Date Of Admission")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.inquiryDateOfAdmission}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Reason For Admission")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.reasonForAdmission}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Last Visit")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.lastVisit}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Last Call")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.lastCall}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Guardian")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.guardianListed}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Last Family Visit Phone Call")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.familyVisitPhoneCall}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Number Of Siblings")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.siblings}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Last Date Of CWC Order")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.lastDateOfCWCOrder}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Last CWC Order")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.Lastcwcorder}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Time of stay in shelter")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.lengthOfStayInShelter}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("CARINGS Registration Number")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.caringsRegistrationNumber}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-2">
            {t("Date LFA, CSR, MERU uploaded in CARINGS")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails.dateLFA_CSR_MERUUploadedINCARINGS}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildDetails;