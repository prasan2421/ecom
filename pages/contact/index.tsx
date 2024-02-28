import React, { useEffect, useState, Fragment, createRef } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
// Import Slick React components
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Formik, useFormik } from "formik";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Grid, Pagination, Navigation } from "swiper";
import Container from "../../components/container";
import axios from "axios";

const sheetKey = process.env.NEXT_PUBLIC_SPREADSHEET_API_KEY;

// import required modules
const options = [
  {
    id: 1,
    name: "Select",
  },
  {
    id: 2,
    name: "Support",
  },
  {
    id: 3,
    name: "Volunteer",
  },
  {
    id: 4,
    name: "Partnership",
  },
];

interface MyFormProps {
  firstname?: string;
  lastname?: string;
  email: string;
  message: string // if this passed all the way through you might do this or make a union type
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function contactForm() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selected, setSelected] = useState(null);
  const [messageAlert, setMessageAlert] = useState(false);

  const submitHandler = async (values:any) => {
    const data = {
      Type: selected,
      First_name: values.firstname,
      Last_name: values.lastname,
      Email: values.email,
      Message: values.message,
    };
    try {
      // Replace 'your-api-endpoint' with the actual URL of your API
  

      const response = await axios.post(
        // `https://sheet.best/api/sheets/${sheetKey}`,
        `https://sheet.best/api/sheets/${sheetKey}`,
        //  `https://script.google.com/macros/s/AKfycbw5ylOSdcugSZgc0ScL7CXQsyAsnH-HZLJNC-M9qupmvWt-6QnFZLx07dc-i9uDJqvHFg/exec`,
        data
      );

      if (response.status === 200) {
        // Request was successful, you can handle the response data here
        console.log("Response:", response);
        setMessageAlert(true);
        // setTimeout(() => {
        //   setMessageAlert(false);
        // }, 5000);
      } else {
        // Handle unexpected status codes or other errors
        alert("An error occurred with status code: " + response.status);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
      console.error("test Error:", error.message);
    }
  };

  const formik = useFormik<MyFormProps>({
    initialValues: { firstname: "", lastname: "", email: "", message: "" },
    validate: values => {
      const errors:any = {};
      if (!values.firstname) {
        errors.firstname = 'Please fill out first name.';
      }
      if (!values.email) {
        errors.email = 'Please fill out email.';
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.message) {
        errors.message = 'Please fill out message.';
      }
      
      return errors;
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));return;
      submitHandler(values);
    },
  });

  return (
    <div className="flex flex-col  text-black dark:text-white items-center my-20 contact-form">
      <h1 className="text-3xl my-5">Contact Us</h1>
      <p className="text-center md:w-[600px] text-gray-400 px-1">
        Do you want to volunteer, be a partner or just simply contact us for
        more? Let us know!
      </p>

      <div className="shadow-md bg-white dark:bg-white py-5 px-5 md:px-[70px] mt-10 md:w-[750px]">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="mt-2 mb-5 md:w-[120px]  bg-white ">
              <Listbox
                name="type"
                //  onBlur={handleCustomBlur}
                value={selected}
                onChange={setSelected}
              >
                {({ open }) => (
                  <>
                    <div className="relative">
                      <Listbox.Button
                        className="relative w-full cursor-default rounded-md bg-white ring-1
ring-gray-500 bg-stone-300 py-2.5 pl-3 pr-10 text-left text-black  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      >
                        <span className="flex items-center">
                          <span className="block truncate">
                            {selected ? selected : "Select"}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          className="absolute z-10 mt-1 max-h-56 w-full ring-1
ring-gray-500 overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm"
                        >
                          {options.map((type) => (
                            <Listbox.Option
                              key={type.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 "
                                )
                              }
                              value={type.name == "Select" ? null : type.name}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {type.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "text-white"
                                          : "text-indigo-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
          <div className="flex flex-row gap-3 ">
            <div className=" block w-full">
              <input
                type="text"
                name="firstname"

                onChange={formik.handleChange}

                //  onBlur={handleCustomBlur}
                value={formik.values.firstname}
                className="  w-full text-black rounded-sm ring-1 ring-gray-500
              dark:bg-stone-300 border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Firstname"
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="text-error mt-2">{formik.errors.firstname}</div>
              ) : null}
            </div>
            <div className=" block w-full">
              <input
                type="text"
                name="lastname"
                onChange={formik.handleChange}
                //  onBlur={handleCustomBlur}
                value={formik.values.lastname}
                className="

w-full
dark:inputDarkModeOverride
rounded-sm
text-black 
ring-1
ring-gray-500
dark:bg-stone-300
border-transparent
focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Lastname"
              />
            </div>
          </div>
          <div className="">
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              //  onBlur={handleCustomBlur}
              value={formik.values.email}
              className="mt-3
block
w-full
rounded-sm
autofill:bg-yellow-200 
text-black 
ring-1
ring-gray-500
dark:bg-stone-300
border-transparent
focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="john@example.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-error mt-2">{formik.errors.email}</div>
            ) : null}
            {/* <text className='text-black'>{errors.email && touched.email && errors.email}</text> */}
            <textarea
              name="message"
              onChange={formik.handleChange}
              //  onBlur={handleCustomBlur}
              value={formik.values.message}
              className="mt-3
block
w-full
text-black 
rounded-sm
ring-1
ring-gray-500
dark:bg-stone-300
border-transparent
focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              rows={4}
              placeholder="Your message"
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="text-error mt-2">{formik.errors.message}</div>
            ) : null}
          </div>

          <div className="block md:flex items-center justify-between mt-5">
            <button
              type="submit"
              className={
                "w-full md:w-auto bg-red-500  px-[65px] py-[20px]  text-white rounded-sm  "
              }
            >
              <p className="text-sm font-normal">Submit</p>
            </button>
            {messageAlert && (
               <div className="mt-5 md:mt-0 font-bold text-green-600">Message sent.</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function VolunteerForm({ volunteerValues, setVolunteerValues }) {
  return (
    <div className="flex flex-col  text-black dark:text-white  my-20">
      <div className="text-center ">
        <h1 className="text-3xl mb-5">Volunteer Application</h1>
        <p className="text-gray-400">
          Please fill out this application form below and we will get in touch
          with you!{" "}
        </p>
      </div>

      <div className="mt-10">
        <div className="flex flex-row gap-5 mt-5">
          <input
            type="text"
            className="
        block
        w-full
        rounded-md
        ring-1
        ring-gray-500
        dark:bg-zinc-700 
        border-transparent
        focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
            placeholder="Firstname"
          />
          <input
            type="text"
            className="
        block
        w-full
        rounded-md
        ring-1
        ring-gray-500
        dark:bg-zinc-700 
        border-transparent
        focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
            placeholder="Lastname"
          />
        </div>
        <div className="flex flex-row gap-5 mt-5">
          <input
            type="text"
            className="
        block
        w-full
        rounded-md
        ring-1
        ring-gray-500
        dark:bg-zinc-700 
        border-transparent
        focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
            placeholder="Email"
          />
          <input
            type="text"
            className="
        block
        w-full
        rounded-md
        ring-1
        ring-gray-500
        dark:bg-zinc-700 
        border-transparent
        focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
            placeholder="Phone Number"
          />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl my-10">Preference in area of Volunteering</h1>
        <div className="flex flex-row flex-1 my-5">
          <div className="flex-1"></div>

          <div className="flex-1">Would love to!</div>
          <div className="flex-1">Would like to</div>
          <div className="flex-1">Would not mind helping</div>
          <div className="flex-1">Not this area</div>
        </div>
        <VolunteerInterest
          title="Marketing"
          value={volunteerValues.marketingValue}
          handleClick={(value) => setVolunteerValues.setMarketingValue(value)}
        />
        <VolunteerInterest
          title="Finance"
          value={volunteerValues.financeValue}
          handleClick={(value) => setVolunteerValues.setFinanceValue(value)}
        />
        <VolunteerInterest
          title="Event management"
          value={volunteerValues.eventValue}
          handleClick={(value) => setVolunteerValues.setEventValue(value)}
        />
        <VolunteerInterest
          title="Ticket Sales"
          value={volunteerValues.ticketValue}
          handleClick={(value) => setVolunteerValues.setTicketValue(value)}
        />
        <VolunteerInterest
          title="Traffic"
          value={volunteerValues.trafficValue}
          handleClick={(value) => setVolunteerValues.setTrafficValue(value)}
        />
      </div>

      <div className="text-center">
        <h1 className="text-3xl my-10">Preference shifts</h1>
        <div className="flex flex-row flex-1 my-5">
          <div className="flex-1">8AM - 1PM</div>
          <div className="flex-1">1PM - 6PM</div>
          <div className="flex-1">6PM - 11PM</div>
        </div>
        <div className="flex flex-row flex-1 my-5">
          <div className="flex-1">
            {" "}
            <input
              type="checkbox"
              className="
      
        rounded-md
        ring-1
        ring-gray-500
        dark:bg-zinc-700 
        border-transparent
        focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
              checked={volunteerValues.timeValue == 0 ? true : false}
              onClick={() => setVolunteerValues.setTimeValue(0)}
            />
          </div>
          <div className="flex-1">
            {" "}
            <input
              type="checkbox"
              className="
      
      rounded-md
      ring-1
      ring-gray-500
      dark:bg-zinc-700 
      border-transparent
      focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
              checked={volunteerValues.timeValue == 1 ? true : false}
              onClick={() => setVolunteerValues.setTimeValue(1)}
            />
          </div>
          <div className="flex-1">
            {" "}
            <input
              type="checkbox"
              className="
      
      rounded-md
      ring-1
      ring-gray-500
      dark:bg-zinc-700 
      border-transparent
      focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
              checked={volunteerValues.timeValue == 2 ? true : false}
              onClick={() => setVolunteerValues.setTimeValue(2)}
            />
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}

function VolunteerInterest(props) {
  return (
    <div className="flex flex-row flex-1 my-5">
      <div className="flex-1">{props.title}</div>
      <div className="flex-1">
        {" "}
        <input
          type="checkbox"
          className="

  rounded-md
  ring-1
  ring-gray-500
  dark:bg-zinc-700 
  border-transparent
  focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
          checked={props.value == 0 ? true : false}
          onClick={() => props.handleClick(0)}
        />
      </div>
      <div className="flex-1">
        {" "}
        <input
          type="checkbox"
          className="

rounded-md
ring-1
ring-gray-500
dark:bg-zinc-700 
border-transparent
focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
          checked={props.value == 1 ? true : false}
          onClick={() => props.handleClick(1)}
        />
      </div>
      <div className="flex-1">
        {" "}
        <input
          type="checkbox"
          className="

rounded-md
ring-1
ring-gray-500
dark:bg-zinc-700 
border-transparent
focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
          checked={props.value == 2 ? true : false}
          onClick={() => props.handleClick(2)}
        />
      </div>
      <div className="flex-1">
        {" "}
        <input
          type="checkbox"
          className="

rounded-md
ring-1
ring-gray-500
dark:bg-zinc-700 
border-transparent
focus:dark:border-zinc-500 focus:ring-0 focus:ring-gray-500"
          checked={props.value == 3 ? true : false}
          onClick={() => props.handleClick(3)}
        />
      </div>
    </div>
  );
}

function contact() {
  const [type, setType] = useState(1);
  const [marketingValue, setMarketingValue] = useState(null);
  const [financeValue, setFinanceValue] = useState(null);
  const [eventValue, setEventValue] = useState(null);
  const [ticketValue, setTicketValue] = useState(null);
  const [trafficValue, setTrafficValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [commentValue, setCommentValue] = useState(null);

  const project = () => {
    switch (type) {
      case 0:
        return (
          <VolunteerForm
            volunteerValues={{
              marketingValue,
              financeValue,
              eventValue,
              ticketValue,
              trafficValue,
              timeValue,
              commentValue,
            }}
            setVolunteerValues={{
              setMarketingValue,
              setFinanceValue,
              setEventValue,
              setTicketValue,
              setTrafficValue,
              setTimeValue,
              setCommentValue,
            }}
          />
        );
      case 1:
        return contactForm();
      case 2:
        return contactForm();
      case 3:
        return contactForm();
      case 4:
        return contactForm();
      case 5:
        return contactForm();
      // case "three": return <ComponentC />;
      // case "four":  return <ComponentD />;

      default:
        return <h1>No project match</h1>;
    }
  };

  return (
    <div className=" mt-20">
      <Container>
        {/* <div className='flex flex-row gap-10 py-10 '>
                <div  className='flex-1 text-black dark:text-white'>
    
                <p className='text-justify text-gray-400 text-2xl'>Hi! Help us get you in touch with the right people, by selecting the category that best fits:</p>
                </div>
                <div className='flex-1 '>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
                <button onClick={()=>setType(0)} className= {type == 0? "bg-white border-red-500 border-2 py-3 text-red-500 rounded-lg ":"bg-red-500 border-2 py-3 text-white rounded-lg"}>Volunteering</button>
                <button onClick={()=>setType(1)} className= {type == 1? "bg-white border-red-500 border-2 py-3 text-red-500 rounded-lg ":"bg-red-500 border-2 py-3 text-white rounded-lg"}>Support</button>
                <button onClick={()=>setType(2)} className= {type == 2? "bg-white border-red-500 border-2 py-3 text-red-500 rounded-lg ":"bg-red-500 border-2 py-3 text-white rounded-lg"}>I have an idea</button>
                <button onClick={()=>setType(3)} className= {type == 3? "bg-white border-red-500 border-2 py-3 text-red-500 rounded-lg ":"bg-red-500 border-2 py-3 text-white rounded-lg"}>Partnership</button>
                <button onClick={()=>setType(4)} className= {type == 4? "bg-white border-red-500 border-2 py-3 text-red-500 rounded-lg ":"bg-red-500 border-2 py-3 text-white rounded-lg"}>I have an idea</button>
                <button onClick={()=>setType(5)} className= {type == 5? "bg-white border-red-500 border-2 py-3 text-red-500 rounded-lg ":"bg-red-500 border-2 py-3 text-white rounded-lg"}>I have an idea</button>
                </div>
                </div>
              </div> */}

        {project()}
      </Container>
    </div>
  );
}

export default contact;


