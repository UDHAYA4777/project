import styled from "styled-components";

const SocialLink = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
    >
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <StyledWrapper>
      <footer className="border-t border-t-gray-200 py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">
                <span className="text-red-600">PERI </span>
                <span>CodeCareer </span>
              </h2>
              <p className="text-sm">
                Connecting students to tech careers, study materials, and
                industry insights
              </p>
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <SocialLink href="https://github.com/UDHAYA4777">
                <GitHubIcon />
              </SocialLink>
              <SocialLink href="mailto:mindrajith29@gmail.com">
                <MailIcon />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/indrajith-m-5540a3200/">
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href="https://discord.com/channels/1331532270720389160/1331532271445872711">
                <DiscordIcon />
              </SocialLink>
            </div>
          </div>
        </div>
      </footer>
    </StyledWrapper>
  );
};

const GitHubIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.4.6.111.823-.26.823-.577v-2.267c-3.338.727-4.043-1.611-4.043-1.611-.548-1.391-1.334-1.766-1.334-1.766-1.087-.743.084-.727.084-.727 1.2.084 1.826 1.233 1.826 1.233 1.065 1.825 2.8 1.297 3.49.996.107-.77.418-1.297.759-1.596-2.667-.3-5.467-1.33-5.467-5.92 0-1.303.467-2.36 1.236-3.192-.123-.3-.535-1.503.117-3.137 0 0 1.007-.323 3.295 1.23C9.812 5.72 10.855 5.5 12 5.5s2.188.22 3.105.713c2.288-1.553 3.295-1.23 3.295-1.23.653 1.634.24 2.837.117 3.137.77.832 1.236 1.89 1.236 3.192 0 4.594-2.8 5.617-5.467 5.92.342.299.652.885.759 1.697.664.732 1.084 1.383 1.207 2.151.149.612-.21 1.205-.833 1.364C20.563 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const MailIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H4V8l8 5 8-5v11z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
  </svg>
);

const DiscordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 15"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
  </svg>
);

const StyledWrapper = styled.div`
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #e1e1e1;
    color: #555;
    border-radius: 50%;
    transition: background-color 0.3s, transform 0.3s;
    margin: 0 10px;
  }

  .social-link:hover {
    background-color: #5865f2;
    transform: scale(1.1);
  }
`;

export default Footer;
