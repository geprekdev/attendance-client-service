import Card from "../components/Card";
import Layout from "./Layout";

export default function ClassList() {
	return (
		<Layout>
			<Card kelas="RPL 3" mapel="BSD" />
			<Card kelas="RPL 2" mapel="MTK" />
			<Card kelas="RPL 1" mapel="PBO" />
			<Card kelas="RPL 3" mapel="BSD" />
		</Layout>
	);
}
