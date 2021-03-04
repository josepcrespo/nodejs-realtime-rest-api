// Establish a Socket.io connection
const socket = io();
// const socket = io();

// Establish a Feathers connection
const client = feathers();

// Initialize our Feathers client application through Socket.io
client.configure(feathers.socketio(socket));

// Use localStorage to store our login token
client.configure(feathers.authentication());

// Login screen
const loginHTML = `<main class="login container">
  <div class="row">
    <div class="col-12 col-6-tablet push-3-tablet text-center heading">
      <h1 class="font-100">Log in</h1>
      <h3>(you will need a user with "admin" or, "manufacturer" permissions)</h3>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
      <form class="form">
        <fieldset>
          <input class="block" type="email" name="email" placeholder="email">
        </fieldset>

        <fieldset>
          <input class="block" type="password" name="password" placeholder="password">
        </fieldset>

        <button type="button" id="login" class="button button-primary block signup">
          Log in
        </button>

        <!-- SORRY, NOT IMPLEMENTED YET! <button type="button" id="signup" class="button button-primary block signup">
          Sign up and log in
        </button> -->

        <a href="/" class="back-link">
          Back to the homepage
        </button>

        <!-- SORRY, NOT IMPLEMENTED YET! <a class="button button-primary block" href="/oauth/github">
          Login with GitHub
        </a> -->
      </form>
    </div>
  </div>
</main>`;

// Sales base HTML
const salesHTML = `<main class="flex flex-column">
  <header class="title-bar">
    <div class="title-wrapper block">
      <span class="title">Realtime Sales</span>
    </div>
    <a href="#" id="logout" class="button button-primary">
      Sign Out
    </a>
  </header>

  <div class="sales-list"></div>
</main>`;

// Renders a sale to the page
const addSale = sale => {
  const sales = document.querySelector('.sales-list');

  if(sales) {
    sales.innerHTML += 
    `<div class="sale-item">
      <h4 class="sale-created-at">
        New sale: ${moment(sale.createdAt).format('MMM Do, hh:mm:ss')}
      </h4>
      <div class="sale-item-prop sale-model">
        car model<span class="tag-value">${sale.model}</span>
      </div>
      <div class="sale-item-prop sale-engine">
        type of engine<span class="tag-value">${sale.engine}</span>
      </div>
      <div class="sale-item-prop sale-doors">
        number of doors<span class="tag-value">${sale.doors}</span>
      </div>
      <div class="sale-item-prop sale-color">
        color<span class="tag-value">${sale.color}</span>
      </div>
      <div class="sale-item-prop sale-extras">
        extras<span class="tag-value">${sale.extras}</span>
      </div>
    </div>`;

    // Always scroll to the bottom of our sales list
    sales.scrollTop = sales.scrollHeight - sales.clientHeight;
  }
};

// Show the login page
const showLogin = (error) => {
  if(document.querySelectorAll('.login').length && error) {
    document.querySelector('.heading').insertAdjacentHTML('beforeend', `<p>There was an error: ${error.message}</p>`);
  } else {
    document.getElementById('app').innerHTML = loginHTML;
  }
};

// Shows the sales page
const showSales = async () => {
  document.getElementById('app').innerHTML = salesHTML;

  // Find the latest 25 sales. They will come with the newest first
  const sales = await client.service('sales').find({
    query: {
      $sort: { createdAt: -1 },
      $limit: 25
    }
  });
  
  // We want to show the newest sale last
  sales.data.reverse().forEach(addSale);
};

// Retrieve email/password object from the login/signup page
const getCredentials = () => {
  const user = {
    email: document.querySelector('[name="email"]').value,
    password: document.querySelector('[name="password"]').value
  };

  return user;
};

// Log in either using the given email/password or the token from storage
const login = async credentials => {
  try {
    let authenticated = null;
    if(!credentials) {
      // Try to authenticate using an existing token
      authenticated = await client.reAuthenticate();
    } else {
      // Otherwise log in with the `local` strategy using the credentials we got
      authenticated = await client.authenticate({
        strategy: 'local',
        ...credentials
      });
    }

    // If successful and,
    // has apropriate permissions,
    // show the sales page.
    if (
      authenticated.user.permissions === 'admin' ||
      authenticated.user.permissions === 'manufacturer'
    ) {
      showSales();
    } else {
      await client.logout();
      showLogin({ message: 'Your user does not have permission to login here.' });
    }
  } catch(error) {
    // If we got an error, show the login page
    await client.logout();
    showLogin(error);
  }
};

const addEventListener = (selector, event, handler) => {
  document.addEventListener(event, async ev => {
    if (ev.target.closest(selector)) {
      handler(ev);
    }
  });
};

// "Signup and login" button click handler
addEventListener('#signup', 'click', async () => {
  // For signup, create a new user and then log them in
  const credentials = getCredentials();
    
  // First create the user
  await client.service('users').create(credentials);
  // If successful log them in
  await login(credentials);
});

// "Login" button click handler
addEventListener('#login', 'click', async () => {
  const user = getCredentials();

  await login(user);
});

// "Logout" button click handler
addEventListener('#logout', 'click', async () => {
  await client.logout();
    
  document.getElementById('app').innerHTML = loginHTML;
});

// Listen to created events and add the new sale in real-time
client.service('sales').on('created', addSale);

// Call login right away so we can show the chat window
// If the user can already be authenticated
login();
