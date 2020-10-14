import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import TopicContainer from "./TopicContainer";
import Post from "./Post";
import About from "./About";
import Options from "./Options";
import ReplyEditor from "./ReplyEditor";
import MemberProfile from "./MemberProfile";
import PostLike from './PostLike'

import { getTitles } from "../db";
import NewPost from "./NewPost";

function App() {
	const [titles, setTitles] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userDetails, setUserDetails] = useState({});

	const topics = [
		"Web Development",
		"Programming",
		"Machine Learning / AI",
		"About this Project (Query / Feedback)",
		"Other",
	];

	useEffect(() => {
		getTitles().then((res) => setTitles(res));
	}, []);

	const onLoadHandler = () => {
		setTimeout(() => {
			setIsLoggedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
		}, 2000);
	};

	return (
		<div onLoad={onLoadHandler} className="ui container">
			<BrowserRouter>
				<Header
					setUserDetails={setUserDetails}
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
				/>
				<Route
					path="/"
					exact
					// component={() => <TopicContainer topic="JavaScript" />}
					render={(props) => (
						<React.Fragment>
							<Options
								showReply={false}
								isLoggedIn={isLoggedIn}
							/>
							{topics.map((topic) => {
								return (
									<TopicContainer
										{...props}
										key={titles.author}
										topic={topic} //Name of the topic
										titles={titles.filter(
											(eachTitle) =>
												eachTitle.topic == topic
										)}
									/>
								);
							})}
						</React.Fragment>
					)}
				/>
				<Route path="/post/:id" component={Post} />
				<Route path="/about" component={About} />
				<Route path="/new" component={NewPost} />
				<Route path="/reply/:id" component={ReplyEditor} />
				<Route path="/member/:email" component={MemberProfile} />
				<Route path="/like" component={PostLike} />

			</BrowserRouter>
			{/* <Footer /> */}
			<br />
		</div>
	);
}

export default App;
