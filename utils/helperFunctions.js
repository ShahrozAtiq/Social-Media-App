export function timeDifference(timeString) {
  const currentDate = new Date();
  const previousDate = new Date(timeString);
  const timeDifference = currentDate.getTime() - previousDate.getTime();

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (timeDifference < minute) {
    const seconds = Math.round(timeDifference / 1000);
    return seconds + (seconds === 1 ? " second ago" : " seconds ago");
  } else if (timeDifference < hour) {
    const minutes = Math.round(timeDifference / minute);
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  } else if (timeDifference < day) {
    const hours = Math.round(timeDifference / hour);
    return hours + (hours === 1 ? " hour ago" : " hours ago");
  } else if (timeDifference < week) {
    const days = Math.round(timeDifference / day);
    return days + (days === 1 ? " day ago" : " days ago");
  } else if (timeDifference < month) {
    const weeks = Math.round(timeDifference / week);
    return weeks + (weeks === 1 ? " week ago" : " weeks ago");
  } else if (timeDifference < year) {
    const months = Math.round(timeDifference / month);
    return months + (months === 1 ? " month ago" : " months ago");
  } else {
    const years = Math.round(timeDifference / year);
    return years + (years === 1 ? " year ago" : " years ago");
  }
}

export function getFilename(filePath) {
  // Extracting the last section of the path
  const sections = filePath.split("/");
  const lastSection = sections[sections.length - 1];

  // Adding random number before the extension
  const extensionIndex = lastSection.lastIndexOf(".");
  const filename = lastSection.substring(0, extensionIndex);
  const extension = lastSection.substring(extensionIndex);
  const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
  const newFilename = `${filename}_${randomNumber}${extension}`;

  return { name: newFilename, fileType: extension.replace(".", "") };
}

export async function getRandomUser(count) {
  const url = "https://api.api-ninjas.com/v1/randomuser";
  const apiKey = "pEm/rt8y2Mw/j9J000F5eQ==2bC0kY8LksRuFacP";
  const users = [];

  for (let i = 0; i < count; i++) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const result = await response.json();
      result.profilePic = `https://randomuser.me/api/portraits/women/${Math.round(
        Math.random() * 100
      )}.jpg`;
      users.push(result);
      console.log(i);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
  return users;
}
