import React, { useEffect, useState } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [dateFilter, setDateFilter] = useState("2024-10-10");
  const [selectedSource, setSelectedSource] = useState("guardianapis");
  const [error, setError] = useState(null);

  const apiKeys = {
    NewsAPI: "69139d0d610248a6b7e7b6dc63752eb9",
    guardianapis: "3095a7e8-ff3b-45de-bbcb-35801c547c25",
    NewsDataIO: "pub_56396fe0af2a3fb2ec4b13e342743cea28d2c",
  };

  const fetchNewsData = async (source, searchQuery, apiKeys) => {
    console.log(dateFilter);
    const newsSources = {
      NewsAPI: `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        search
      )}&from=${dateFilter}&apiKey=${apiKeys.NewsAPI}`,
      guardianapis: `https://content.guardianapis.com/search?q=${encodeURIComponent(
        search
      )}&from-date=${dateFilter}&api-key=${
        apiKeys.guardianapis
      }&show-fields=thumbnail,headline,trailText`,
      NewsDataIO: `https://newsdata.io/api/1/latest?apikey=${
        apiKeys.NewsDataIO
      }&q=${encodeURIComponent(search)}`,
    };

    try {
      const response = await fetch(newsSources[source]);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      let transformedData;

      switch (source) {
        case "NewsAPI":
          transformedData = jsonData.articles.slice(0, 10);
          break;
        case "guardianapis":
          transformedData = transformGuardianToNewsApi(
            jsonData.response.results.slice(0, 10)
          );
          break;
        case "NewsDataIO":
          transformedData = transformNewsDataIoToNewsApi(
            jsonData.results.slice(0, 10)
          );
          console.log("hello world", transformedData);
          break;
        default:
          throw new Error("Unknown news source");
      }

      return transformedData;
    } catch (err) {
      console.error("Failed to fetch news data:", err);
      throw err;
    }
  };

  function transformGuardianToNewsApi(results) {
    return results.map((item) => ({
      source: {
        id: item.sectionId || null,
        name: item.sectionName || "[Removed]",
      },
      author: item.byline ? item.byline.replace("By ", "") : null,
      title: item.webTitle || "[Removed]",
      description:
        item.fields.trailText ||
        item.fields.headline ||
        "[No description available]",
      url: item.webUrl || "https://removed.com",
      urlToImage: item.fields?.thumbnail || null,
      publishedAt: item.webPublicationDate || "2024-09-18T14:05:48Z",
      content:
        item.blocks?.body?.map((block) => block.bodyText || "").join("\n") ||
        "[Removed]",
    }));
  }

  function transformNewsDataIoToNewsApi(results) {
    return results.map((item) => ({
      source: {
        id: item.country || null,
        name: item.source || "[Removed]",
      },
      author: item.creator ? item.creator[0] : null,
      title: item.title || "[Removed]",
      description: item.description || "[No description available]",
      url: item.link || "https://removed.com",
      urlToImage: item.image_url || null,
      publishedAt: item.pubDate || "2024-09-18T14:05:48Z",
      content: item.content || "[No content available]",
    }));
  }

  const getData = async () => {
    try {
      const data = await fetchNewsData(selectedSource, search, apiKeys);
      setNewsData(data);
      setError(null);
    } catch (err) {
      setError("Failed to load news data. Please try again later.");
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSource, search, dateFilter]);

  const searchDate = (event) => {
    setDateFilter(event.target.value);
  };

  const userInput = (event) => {
    setSearch(event.target.value);
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    getData();
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  return (
    <div>
      <nav className="bg-gray-900 p-4">
        <h1 className="text-white text-3xl font-bold">WorldNews.net</h1>
      </nav>

     
      <div className="marquee overflow-hidden whitespace-nowrap bg-gray-100 py-2">
        <div className="marquee-content inline-flex space-x-8 text-blue-600 animate-marquee">
          <a
            href="https://www.ijprems.com/uploadedfiles/paper//issue_6_june_2024/35281/final/fin_ijprems1719824627.pdf"
            className="hover:underline"
          >
            The Rise of AI in Everyday Life
          </a>
          <a
            href="https://en.wikipedia.org/wiki/List_of_official_County_Championship_winners"
            className="hover:underline"
          >
            Local Team Wins Championship Title
          </a>
          <a
            href="https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eight-tips-for-healthy-eating/"
            className="hover:underline"
          >
            New Guidelines for Healthy Living
          </a>
          <a
            href="https://in.bookmyshow.com/explore/upcoming-movies"
            className="hover:underline"
          >
            Upcoming Movies to Watch
          </a>
          <a
            href="https://www.thehindubusinessline.com/economy/policy/"
            className="hover:underline"
          >
            Major Policies news
          </a>
          <a
            href="https://www.lonelyplanet.com/best-in-travel"
            className="hover:underline"
          >
            Top Destinations to Visit in 2024
          </a>
        </div>
      </div>

      <nav className="bg-gray-200 p-4 space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={userInput}
            value="sports"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sports
          </button>
          <button
            onClick={userInput}
            value="politics"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Politics
          </button>
          <button
            onClick={userInput}
            value="entertainment"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Entertainment
          </button>
          <button
            onClick={userInput}
            value="health"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Health
          </button>
          <button
            onClick={userInput}
            value="fitness"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Fitness
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            onChange={searchDate}
            type="date"
            id="Date"
            name="Date"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={getData}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        <div className="source mt-4">
          <label className="text-lg font-semibold text-gray-700 mr-4 font-serif">
            Select your news source:
          </label>
          <select
            onChange={handleSourceChange}
            value={selectedSource}
            className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="NewsAPI">NewsAPI</option>
            <option value="guardianapis">Guardian APIs</option>
            <option value="NewsDataIO">NewsDataIO</option>
          </select>
        </div>
      </nav>

      <div>{newsData ? <Card data={newsData} /> : null}</div>

      <footer className="bg-gray-900 text-white p-6">
        <div className="container mx-auto text-center space-y-4">
          <h3 className="text-2xl font-semibold">WorldNews.net</h3>
          <p>
            Stay informed with the latest breaking news, in-depth analysis, and
            real-time updates from around the globe, all in one place.
          </p>
          <div className="social-links flex justify-center space-x-4"></div>
        </div>
      </footer>
    </div>
  );
};

export default Newsapp;
