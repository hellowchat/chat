import React, { useContext } from "react"
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import { AuthContext } from "../../context/Auth/AuthContext";
import Select from '@material-ui/core/Select';
import { i18n } from "../../translate/i18n";
import MenuItem from '@material-ui/core/MenuItem';
import Chart from "./Chart"
import toastError from "../../errors/toastError";

import api from "../../services/api";
const useStyles = makeStyles(theme => ({
	container: {

		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	fixedHeightPaper: {
		boxShadow: "none", //
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: 240,
	},
	customFixedHeightPaper: {
		boxShadow: "none", //
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: 120,
	},
	customFixedHeightPaperLg: {
		boxShadow: "none", //
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: "100%",
	},
}))


const Dashboard = () => {

	const classes = useStyles()


	const { user } = useContext(AuthContext);

	const [loading, setLoading] = useState(true);

	const [tickets, setTickets] = useState([]);


	const [userId, setUserId] = useState('');
	const [users, setUsers] = useState([]);
	const [dateIni, setDateIni] = useState('');
	const [dateFin, setDateFin] = useState('');



	const [openTickets, setOpenTickets] = useState(0);
	const [pendingTickets, setPendingTickets] = useState(0);
	const [closedTickets, setClosedTickets] = useState(0);

	const buttonSearchByUserId = async () => {
		setLoading(true)
		const delayDebounceFn = setTimeout(() => {
			const fetchTickets = async () => {
				try {
					const { data } = await api.get("/tickets/custom", {
						params: {
							dateIni,
							dateFin,
							userId,



						},
					})

					const result = await api.get("/users")

					setUsers(result.data.users)

					setOpenTickets(data.open)
					setPendingTickets(data.pending)
					setClosedTickets(data.closed)

					setTickets(data)






					setLoading(false)
				} catch (err) {

					setLoading(false)
					toastError(err)
				}
			}



			fetchTickets()
		}, 500)
		return () => clearTimeout(delayDebounceFn)

	}

	useEffect(() => {
		buttonSearchByUserId()

	}, []);

	return (
		<div>
			<Container maxWidth="lg" className={classes.container}>


				<form className={classes.container} noValidate>




					<Select
						value={userId}
						onChange={
							(e) => setUserId(e.target.value)}
						style={{ width: '150px', marginRight: '10px' }}

						name="searchUserId"
						className=""
					>

						{users.map((e) => {

							return <MenuItem value={e.id} key={e.id}>
								{e.name}
							</MenuItem>
						})}

					</Select>



					<TextField
						id="date"
						label="Data Inicial"
						type="date"
						defaultValue={dateIni}
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setDateIni(e.target.value)}
					/>

					<TextField
						id="date"
						label="Data Final"
						type="date"
						defaultValue={dateFin}
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setDateFin(e.target.value)}
					/>
					<Button variant="outlined" color="primary" className={classes.button} onClick={() => buttonSearchByUserId()}>
						Search
					</Button>

				</form>
				<Grid container spacing={3}>
					<Grid item xs={4}>
						<Paper className={classes.customFixedHeightPaper} style={{ overflow: "hidden" }}>
							<Typography component="h3" variant="h6" color="primary" paragraph>
								{i18n.t("dashboard.messages.inAttendance.title")}
							</Typography>
							<Grid item>
								<Typography component="h1" variant="h4">
									{openTickets}
								</Typography>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.customFixedHeightPaper} style={{ overflow: "hidden" }}>
							<Typography component="h3" variant="h6" color="primary" paragraph>
								{i18n.t("dashboard.messages.waiting.title")}
							</Typography>
							<Grid item>
								<Typography component="h1" variant="h4">
									{pendingTickets}
								</Typography>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.customFixedHeightPaper} style={{ overflow: "hidden" }}>
							<Typography component="h3" variant="h6" color="primary" paragraph>
								{i18n.t("dashboard.messages.closed.title")}
							</Typography>
							<Grid item>
								<Typography component="h1" variant="h4">
									{closedTickets}
								</Typography>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.fixedHeightPaper}>
							<Chart />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Dashboard