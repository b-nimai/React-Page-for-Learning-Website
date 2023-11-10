import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import { apiUrl, filterData } from "./data";
import { toast } from "react-toastify";
import Spinner from "./Components/Spinner";

const App = () => {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  useEffect( () =>{
    const fetchData = async () =>{
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const output = await response.json();
        setCourses(output.data);
      } catch (error) {
        toast.error("Something went wrong...");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>

      <div className="bg-bgDark2 min-h-screen min-w-full">
          <Filter filterData={filterData}  category={category} setCategory={setCategory}></Filter>

            <div className="w-11/12 max-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh] flex-wrap">
              {
                loading ? (<Spinner></Spinner>) : (<Cards courses={courses} category={category}></Cards>)
              }
            </div>
      </div>

    </div>
  );
};

export default App;
