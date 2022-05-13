import React from "react";

export default function Layout({ children }) {
	return (
		<div>
			<div className="bg-slate-700 w-full p-5 text-white">Navabr</div>
			{children}
		</div>
	);
}
