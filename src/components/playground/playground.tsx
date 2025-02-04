"use client";
import { getUsers } from "@/apiServices";
import Header from "../commons/header";
import { UsersSearchDTO } from "@/apiServices/apiController/users/dto/users.dto";
import { use, useEffect, useState } from "react";

const Playground = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const params: UsersSearchDTO = {};
    let res: ModelUsersResponse = await getUsers(params);
    groupingData(res.users);
    setIsLoading(false);
  };

  const groupingData = (users: ModelUser[]) => {
    const resultData: any = {};
    users.forEach((user) => {
      const department = user.company.department;

      // Department
      if (!resultData[department]) {
        resultData[department] = {
          male: 0,
          female: 0,
          ageRange: "-",
          hair: {},
          addressUser: {},
        };
      }

      // Gender
      mappingGender(resultData, user, department);

      // Age Range
      mappingAgeRange(resultData, user, department);

      // Hair
      mappingHair(resultData, user, department);

      // Address
      mappingAddress(resultData, user, department);
    });

    setUserData(resultData);
  };

  const mappingAddress = (
    resultData: any,
    user: ModelUser,
    department: string
  ) => {
    const userName = `${user.firstName}${user.lastName}`;
    resultData[department].addressUser[userName] = user.address.postalCode;
    return resultData;
  };

  const mappingHair = (
    resultData: any,
    user: ModelUser,
    department: string
  ) => {
    if (!resultData[department].hair[user.hair.color]) {
      resultData[department].hair[user.hair.color] = 1;
    } else {
      resultData[department].hair[user.hair.color]++;
    }
    return resultData;
  };

  const mappingGender = (
    resultData: any,
    user: ModelUser,
    department: string
  ) => {
    if (user.gender === "male") {
      resultData[department].male++;
    } else {
      resultData[department].female++;
    }
    return resultData;
  };

  const mappingAgeRange = (
    resultData: any,
    user: ModelUser,
    department: string
  ) => {
    if (resultData[department].ageRange === "-") {
      resultData[department].ageRange = `${user.age}-${user.age}`;
    } else {
      const ageRange = resultData[department].ageRange.split("-");
      const minAge = Math.min(parseInt(ageRange[0]), user.age);
      const maxAge = Math.max(parseInt(ageRange[1]), user.age);
      resultData[department].ageRange = `${minAge}-${maxAge}`;
    }
    return resultData;
  };

  return (
    <div>
      <Header title="Playground" />
      {isLoading ? (
        <div  data-testid="loading-users-data">Loading Users Data...</div>
      ) : (
        <>
          <div>Users Data is : </div>
          <div data-testid="json-users-data">
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default Playground;
