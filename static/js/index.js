const msgInput = document.querySelector('.message-input'),
	msgList = document.querySelector('.messages-list'),
	sendBtn = document.querySelector('.send-btn'),
	usernameInput = document.querySelector('.username-input');

const app = async () => {
	const messages = [];

	const socket = io('http://localhost:3000');

	const getMessages = async () => {
		try {
			const { data } = await axios.get('http://localhost:3000/api/chat');

			console.log(data);

			data.forEach((message) => messages.push(message));
		} catch (e) {
			console.log(e.message);
		}
	};

	getMessages();

	const renderMessages = (data) => {
		let messages = '';

		data.forEach(
			(message) =>
				(messages += `
		<li class='bg-dark p-2 rounded mb-2 d-flex message justify-content-between'>
			<div class='mr-2'>
				<span class='text-info'>${message.username}</span>
				<p class='text-light'>${message.text}</p>
			</div>
			<span class='text-muted text-right date'>${new Date(message.createdAt).toLocaleString('ru', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			})}</span>
		</li>`),
		);
	};

	renderMessages(messages);
};

app();
