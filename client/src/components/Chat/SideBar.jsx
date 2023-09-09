import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SideBar({ users, sideBar, handleSideBar }) {
	return (
		<div className={sideBar ? "side-bar active" : "side-bar inactive"}>
			<ul>
				<li onClick={handleSideBar}>
					<FontAwesomeIcon icon="fa-xmark" />
				</li>
				{
					users.length ?
					users.map((u) => <li key={u.id}>{u.name}</li>) :
					<li>No active users.</li>
				}
			</ul>
		</div>
	)
}