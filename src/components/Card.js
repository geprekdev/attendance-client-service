import React from "react";

export default function Card({ kelas, mapel }) {
	return (
		<div className="border w-48 p-5 bg-sky-200">
			<h1 className="text-5xl text-center">{kelas}</h1>
			<p className="text-center">{mapel}</p>
		</div>
	);
}
