// material-ui
import { styled, useTheme } from "@mui/material/styles";

// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";

import { cloneElement, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  AppBar as MuiAppBar,
  Container,
  Grid,
  Link,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";

// project imports
import Logo from "ui-component/Logo";

// assets
import headerBackground from "assets/images/landing/bg-header.jpg";

function ElevationScroll({ children, window }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });

  return cloneElement(children, {
    elevation: trigger ? 1 : 0,
    style: {
      backgroundColor:
        theme.palette.mode === "dark" && trigger
          ? theme.palette.dark[800]
          : theme.palette.background.default,
      color: theme.palette.text.dark,
    },
  });
}

const HeaderWrapper = styled("div")(({ theme }) => ({
  backgroundImage: `url(${headerBackground})`,
  backgroundSize: "100% 600px",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  textAlign: "center",
  paddingTop: 30,
  [theme.breakpoints.down("md")]: {
    paddingTop: 0,
  },
}));

// ============================|| SAAS PAGES - PRIVCY POLICY ||============================ //

const PrivacyPolicy = () => {
  const theme = useTheme();

  return (
    <HeaderWrapper>
      <ElevationScroll>
        <MuiAppBar>
          <Container>
            <Toolbar sx={{ py: 2.5, px: `0 !important` }}>
              <Typography
                component="div"
                sx={{ flexGrow: 1, textAlign: "left" }}
              >
                <Logo />
              </Typography>
            </Toolbar>
          </Container>
        </MuiAppBar>
      </ElevationScroll>

      <Container>
        <Grid container justifyContent="center" spacing={gridSpacing}>
          <Grid
            item
            sm={10}
            md={7}
            sx={{ mt: { md: 12.5, xs: 2.5 }, mb: { md: 8, xs: 2.5 } }}
          >
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  color="white"
                  component="div"
                  sx={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    lineHeight: 1.4,
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1.8125rem",
                      marginTop: "80px",
                    },
                  }}
                >
                  Terms and Conditions
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 400,
                    lineHeight: 1.4,
                    [theme.breakpoints.up("md")]: { my: 0, mx: 12.5 },
                  }}
                  color="white"
                >
                  Last updated on 7th June 2024
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MainCard
              elevation={4}
              border={false}
              boxShadow
              shadow={4}
              sx={{ mb: 3 }}
            >
              <Stack spacing={2} sx={{ textAlign: "left" }}>
                <Typography variant="h3">Introduction and Acceptance of Terms</Typography>
                <Typography>
                  Welcome to Talent Scope AI, an advanced analytics application developed by Avrij Inc. ("Company," "we," "us," or "our").
                  Talent Scope AI utilizes cutting-edge AI and machine learning technologies to provide valuable insights into team dynamics and individual employee well-being by analyzing recorded meetings, such as Zoom sessions.
                  <br />
                  <br />
                  By accessing, using, or downloading Talent Scope AI (the "Application"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions (the "Agreement").
                  If you do not agree to these terms, you should not use or access the Application.
                  <br />
                  <br />
                  This Agreement constitutes a legally binding agreement between you ("User," "you," or "your") and Avrij Inc. governing your use of the Application. Avrij Inc. is an analytics company specializing in AI and machine learning, with its cutting-edge platform, "Atom," serving as the foundation for a suite of innovative applications designed to revolutionize various aspects of Professional Sports HR services and beyond.
                  <br />
                  <br />
                  By using Talent Scope AI, you acknowledge that the Application is powered by Avrij Inc.'s proprietary Atom platform and that the insights provided by the Application are based on AI and machine learning technologies. You further acknowledge that while the Application strives to provide accurate and useful insights, the information provided should be used as a supplementary tool and not as a sole basis for decision-making.
                  <br />
                  <br />
                  We reserve the right to update, modify, or replace any part of this Agreement at any time. It is your responsibility to review this Agreement periodically for changes. Your continued use of the Application following the posting of any changes to this Agreement constitutes acceptance of those changes.
                </Typography>

                <Typography variant="h3">Description of Service</Typography>
                <Typography>
                  Talent Scope AI is an advanced analytics application designed to provide insights into team dynamics and individual employee well-being by analyzing recorded meetings, such as Zoom sessions.
                  The Application utilizes AI and machine learning technologies to process and analyze the uploaded meeting recordings and generate reports on sentiment, emotion, and mental performance or mindset.
                </Typography>

                <Typography>
                  Key features of Talent Scope AI include:
                </Typography>

                <ol>
                  <li>
                    <Typography>
                      <b>Drag-and-drop functionality:&nbsp;</b>
                      Easily upload recorded meetings to the Application for analysis.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Sentiment analysis:&nbsp;</b>
                      Gain insights into the overall sentiment of the meeting participants, including positive, negative, and neutral sentiments.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Emotion detection:&nbsp;</b>
                      Understand the emotional states of the meeting participants, such as happiness, sadness, anger, and surprise.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Mental performance and mindset analysis:&nbsp;</b>
                      Assess the mental performance and mindset of the meeting participants, including engagement, focus, and stress levels.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Team dynamics insights:&nbsp;</b>
                      Obtain a comprehensive overview of the team dynamics, including collaboration, communication, and interpersonal relationships.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Individual employee well-being:&nbsp;</b>
                      Gain insights into the well-being of individual employees, helping to identify potential issues and support their mental health and job satisfaction.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Secure data handling:&nbsp;</b>
                      All uploaded meeting recordings and generated insights are handled securely, in compliance with applicable data privacy laws and regulations.
                    </Typography>
                  </li>
                </ol>
                <Typography>
                  By using Talent Scope AI, you acknowledge that the insights provided by the Application are generated using AI and machine learning technologies and should be used as a supplementary tool to support decision-making processes.
                  The Application does not replace the need for human judgment, and any decisions made based on the insights provided by Talent Scope AI should be made in conjunction with other relevant information and professional guidance.
                  <br />
                  <br />
                  Avrij Inc. reserves the right to modify, update, or discontinue any features or functionalities of Talent Scope AI at any time without prior notice. We will make reasonable efforts to inform users of any significant changes to the Application or its features                  
                </Typography>

                <Typography variant="h3">User Conduct and Responsibilities</Typography>

                <Typography>
                  To access and use Talent Scope AI, you may be required to create a user account.
                  By creating an account, you agree to provide accurate, current, and complete information about yourself as prompted by the registration process.
                  You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Eligibility:&nbsp;</b>
                      You must be at least 18 years old or the legal age of majority in your jurisdiction, whichever is greater, to create an account and use Talent Scope AI. By creating an account, you represent and warrant that you meet this eligibility requirement.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Account Creation:&nbsp;</b>
                      During the registration process, you will be asked to provide certain information, such as your name, email address, company name, and job title. You agree to provide accurate and complete information and to update this information as necessary to keep it current.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Account Responsibility:&nbsp;</b>
                      You are solely responsible for safeguarding your account information, including your password. You agree to notify Avrij Inc. immediately of any unauthorized use of your account or any other breach of security. Avrij Inc. will not be liable for any loss or damage arising from your failure to comply with this responsibility.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Account Suspension or Termination:&nbsp;</b>
                      Avrij Inc. reserves the right to suspend or terminate your account at any time, without prior notice, if we believe that you have violated this Agreement or if we suspect any unauthorized access or use of your account.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Organization Accounts:&nbsp;</b>
                      If you are creating an account on behalf of an organization, you represent and warrant that you have the necessary authority to bind the organization to this Agreement. In such cases, the terms "you" and "your" refer to both the individual user and the organization.
                    </Typography>
                    <br />             
                  </li>
                  <li>
                    <Typography>
                      <b>Account Sharing:&nbsp;</b>
                      You agree not to share your account with any other person or entity. Each user must create their own individual account to access and use Talent Scope AI.
                    </Typography>
                  </li>
                </ol>

                <Typography>
                  By creating an account and using Talent Scope AI, you acknowledge and agree to these terms regarding user accounts and registration.
                </Typography>

                <br />
                <Typography variant="h3">User Responsibilities and Acceptable Use</Typography>

                <Typography>
                  By using Talent Scope AI, you agree to use the Application responsibly and in compliance with all applicable laws and regulations.
                  You are solely responsible for your use of the Application and any content you upload, analyze, or share through the Application.
                </Typography>

                <ol>
                  <li>
                    <Typography>
                      <b>Lawful Use:&nbsp;</b>
                      You agree to use Talent Scope AI only for lawful purposes and in a manner consistent with this Agreement. You shall not use the Application for any illegal, fraudulent, or unauthorized purposes.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Acceptable Use:&nbsp;</b>
                      When using Talent Scope AI, you agree not to: <br />
                      a) Upload or analyze any content that infringes upon the intellectual property rights of others;<br />
                      b) Upload or analyze any content that is defamatory, obscene, offensive, or otherwise inappropriate;<br />
                      c) Use the Application to harass, abuse, or intimidate others;<br />
                      d) Attempt to gain unauthorized access to the Application, its servers, or any connected systems;<br />
                      e) Interfere with or disrupt the integrity or performance of the Application or its related systems;<br />
                      f) Circumvent, disable, or otherwise interfere with any security features of the Application;<br />
                      g) Use any automated systems, such as robots, scrapers, or offline readers, to access the Application or collect data from it;<br />
                      h) Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity;<br />
                      i) Use the Application for any competitive purposes or to build a similar or competitive product or service.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>User Content:&nbsp;</b>
                      By uploading or analyzing content through Talent Scope AI, you grant Avrij Inc.
                      a non-exclusive, royalty-free, worldwide license to use, store, reproduce, modify, create derivative works from, and display such content for the purposes of providing and improving the Application. You represent and warrant that you have the necessary rights and permissions to grant this license.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Confidentiality:&nbsp;</b>
                      You agree to keep any confidential information obtained through Talent Scope AI, including but not limited to insights, reports, and analyses, strictly confidential and not to disclose such information to any third party without the prior written consent of Avrij Inc.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Feedback:&nbsp;</b>
                      If you provide feedback, suggestions, or ideas about Talent Scope AI, you grant Avrij Inc. a non-exclusive, royalty-free, worldwide, perpetual, and irrevocable license to use, modify, and incorporate such feedback into the Application or other products and services offered by Avrij Inc.
                    </Typography>
                  </li>
                </ol>

                <Typography>
                  Avrij Inc. reserves the right to investigate and take appropriate action against any user who violates these user responsibilities and acceptable use terms, including but not limited to terminating access to the Application and pursuing legal action.
                </Typography>

                <br />
                <Typography variant="h3">Intellectual Property Rights</Typography>
                <Typography>
                  All intellectual property rights related to Talent Scope AI, including but not limited to copyrights, trademarks, patents, trade secrets, and proprietary information, are owned by Avrij Inc. or its licensors.
                  The Application is protected by applicable intellectual property laws and international treaties.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Ownership:&nbsp;</b>
                      You acknowledge and agree that Avrij Inc. owns all right, title, and interest in and to Talent Scope AI, including all intellectual property rights therein. Nothing in this Agreement shall be construed as granting you any rights to Avrij Inc.'s intellectual property, except for the limited license to use the Application as provided herein.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Limited License:&nbsp;</b>
                      Subject to your compliance with this Agreement, Avrij Inc. grants you a non-exclusive, non-transferable, revocable, and limited license to access and use Talent Scope AI for your internal business purposes.
                      This license does not allow you to:<br />
                      a) Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the Application;<br />
                      b) Reverse engineer, decompile, or disassemble the Application or attempt to discover its source code;<br />
                      c) Use the Application for any purpose that is unlawful or prohibited by this Agreement.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Trademarks:&nbsp;</b>
                      Avrij Inc.'s trademarks, logos, and service marks ("Marks") displayed on or through Talent Scope AI are the property of Avrij Inc.
                      You are not permitted to use these Marks without the prior written consent of Avrij Inc.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Third-Party Intellectual Property:&nbsp;</b>
                      Talent Scope AI may contain content, software, or services provided by third parties. Such third-party materials may be subject to separate terms and conditions. You agree to comply with any such terms and conditions when using the Application.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Infringement Claims:&nbsp;</b>
                      If you believe that any content on Talent Scope AI infringes upon your intellectual property rights, you may notify Avrij Inc. in accordance with the Digital Millennium Copyright Act (DMCA) or other applicable laws. Avrij Inc. will promptly investigate any alleged infringement and take appropriate action, which may include removing the infringing content or terminating the offending user's access to the Application.
                    </Typography>
                  </li>
                </ol>
                <Typography>
                  By using Talent Scope AI, you acknowledge and agree to respect the intellectual property rights of Avrij Inc. and third parties.
                  Any unauthorized use of intellectual property may result in the termination of your access to the Application and potential legal action.
                </Typography>
                <br />

                <Typography variant="h3">Data Privacy and Security</Typography>
                <Typography>
                  Avrij Inc. is committed to protecting the privacy and security of your personal information and the data you upload or analyze through Talent Scope AI.
                  This section outlines how we collect, use, store, and share your data, as well as our compliance with applicable data protection laws.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Data Collection and Usage:&nbsp;</b>
                      a) Personal Information: When you create an account or use Talent Scope AI, we may collect certain personal information, such as your name, email address, company name, and job title. We use this information to provide and improve the Application, communicate with you, and personalize your experience.<br />
                      b) Uploaded Content: When you upload recorded meetings or other content to Talent Scope AI for analysis, we collect and process such data to generate insights, reports, and analyses. We use this data solely for the purpose of providing the Application's services to you and improving our AI and machine learning algorithms.<br />
                      c) Usage Data: We may collect certain usage data when you interact with Talent Scope AI, such as your IP address, browser type, device information, and pages visited. This data is used to analyze trends, administer the Application, track user movements, and gather broad demographic information for aggregate use.<br />
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Data Storage and Protection:&nbsp;</b>
                      a) Security Measures: Avrij Inc. employs industry-standard security measures to protect your data from unauthorized access, use, or disclosure. This includes the use of secure servers, encryption, and access controls.<br />
                      b) Data Retention: We retain your personal information and uploaded content for as long as necessary to provide the Application's services to you, comply with legal obligations, resolve disputes, and enforce our agreements. After such time, we will securely delete or anonymize your data.<br />
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Data Sharing and Disclosure:&nbsp;</b>
                      a) Third-Party Service Providers: We may share your data with trusted third-party service providers who assist us in operating the Application, conducting our business, or providing services to you. These service providers are bound by confidentiality obligations and are only permitted to use your data as necessary to perform their functions.<br />
                      b) Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your data may be transferred to the acquiring entity. We will notify you via email or prominent notice within the Application of any such change in ownership or control of your data.<br />
                      b) Legal Requirements: We may disclose your data if required to do so by law or in the good faith belief that such action is necessary to comply with legal obligations, protect and defend the rights or property of Avrij Inc., or protect the personal safety of our users or the public.<br />
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Compliance with Applicable Laws:&nbsp;</b>
                      Avrij Inc. complies with applicable data protection laws, including the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA) and the California Consumer Privacy Act (CCPA) for users in California. We have implemented appropriate technical and organizational measures to ensure the protection of your data and uphold your rights under these regulations.<br />
                      a) GDPR: If you are located in the EEA, you have the right to access, rectify, erase, restrict, or object to the processing of your personal data, as well as the right to data portability. You may also have the right to lodge a complaint with your local data protection authority.<br />
                      b) CCPA: If you are a California resident, you have the right to request access to your personal information, know about the categories of personal information we collect, and request the deletion of your personal information. We do not sell your personal information to third parties.<br />
                    </Typography>
                    <br />
                  </li>
                </ol>                
                <Typography>
                  By using Talent Scope AI, you acknowledge and consent to the collection, use, storage, and sharing of your data as described in this section.
                  If you have any questions or concerns about our data privacy and security practices, please contact us using the information provided in the "Contact Information" section of this Agreement.
                </Typography>

                <br />
                <Typography variant="h3">Third-Party Services and Integrations</Typography>
                <Typography>
                  Talent Scope AI may contain links to or integrations with third-party websites, services, or applications ("Third-Party Services").
                  These Third-Party Services are not under the control of Avrij Inc. and are subject to their own terms, conditions, and privacy policies.
                  This section outlines your responsibilities and our disclaimer regarding Third-Party Services.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Third-Party Terms and Conditions:&nbsp;</b>
                      When you access or use any Third-Party Services through Talent Scope AI, you agree to comply with the applicable terms, conditions, and privacy policies of those Third-Party Services. Avrij Inc. is not responsible for the content, functionality, or practices of any Third-Party Services.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Data Sharing with Third-Party Services:&nbsp;</b>
                      When you choose to integrate Talent Scope AI with Third-Party Services, you acknowledge and agree that certain data, including your personal information and uploaded content, may be shared with those Third-Party Services.
                      Avrij Inc. is not responsible for the privacy practices or security measures of any Third-Party Services. You are solely responsible for reviewing and understanding the data sharing practices of those Third-Party Services before integrating them with Talent Scope AI.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Disclaimer of Liability:&nbsp;</b>
                      Avrij Inc. disclaims any liability for any loss, damage, or injury arising from your use of Third-Party Services or their integration with Talent Scope AI.
                      We do not endorse, guarantee, or warrant the accuracy, reliability, or quality of any Third-Party Services, and your use of such services is at your own risk.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Removal of Third-Party Integrations:&nbsp;</b>
                      Avrij Inc. reserves the right to remove or disable any Third-Party Services integrations within Talent Scope AI at any time, without prior notice, if we believe such integrations violate this Agreement, pose a security risk, or infringe upon the intellectual property rights of others.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Support for Third-Party Services:&nbsp;</b>
                      If you experience any issues or have questions regarding Third-Party Services integrated with Talent Scope AI, you should contact the third-party provider directly. Avrij Inc. is not responsible for providing support or assistance for any Third-Party Services.
                    </Typography>
                  </li>
                </ol>
                <Typography>
                  By using Talent Scope AI and integrating it with Third-Party Services, you acknowledge and agree to these terms regarding Third-Party Services and integrations.
                  It is your responsibility to carefully evaluate and understand the implications of integrating any Third-Party Services with the Application.
                </Typography>
                <br />

                <Typography variant="h3">Disclaimer of Warranties</Typography>
                <Typography>
                  Talent Scope AI is provided on an "as is" and "as available" basis, without any warranties of any kind, whether express, implied, or statutory.
                  Avrij Inc. disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising out of course of dealing or usage of trade.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>No Guarantee of Accuracy or Reliability:&nbsp;</b>
                      Avrij Inc. does not guarantee the accuracy, reliability, completeness, or timeliness of the insights, reports, analyses, or any other information provided by Talent Scope AI. The Application relies on AI and machine learning technologies, which may be subject to errors, biases, or inaccuracies. You acknowledge that any reliance on such information is at your own risk.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>No Warranty of Uninterrupted or Error-Free Operation:&nbsp;</b>
                      Avrij Inc. does not warrant that Talent Scope AI will be uninterrupted, secure, or free from errors, viruses, or other harmful components.
                      We do not guarantee that any defects or errors in the Application will be corrected.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Limitation of Liability:&nbsp;</b>
                      To the maximum extent permitted by applicable law, in no event shall Avrij Inc., its affiliates, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or in connection with your use of Talent Scope AI, even if advised of the possibility of such damages.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Indemnification:&nbsp;</b>
                      You agree to indemnify, defend, and hold harmless Avrij Inc., its affiliates, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees arising out of or in connection with your use of Talent Scope AI or your violation of this Agreement.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Sole Responsibility:&nbsp;</b>
                      You acknowledge that you are solely responsible for your use of Talent Scope AI and any decisions made based on the insights, reports, or analyses provided by the Application. Avrij Inc. shall not be liable for any actions taken or not taken based on the information provided by the Application.
                    </Typography>
                  </li>
                </ol>

                <Typography>
                  By using Talent Scope AI, you understand and agree that you are using the Application at your own risk.
                  If you do not agree with this disclaimer of warranties, you should not use the Application.
                </Typography>
                <br />

                <Typography variant="h3">Limitation of Liability</Typography>
                <Typography>
                  To the maximum extent permitted by applicable law, Avrij Inc. and its affiliates, directors, employees, agents, suppliers, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or in connection with your use of Talent Scope AI or your inability to use the Application, even if Avrij Inc. has been advised of the possibility of such damages.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Aggregate Liability:&nbsp;</b>
                      In no event shall Avrij Inc.'s aggregate liability arising out of or in connection with this Agreement or your use of Talent Scope AI exceed the total amount paid by you to Avrij Inc. for the use of the Application during the twelve (12) months immediately preceding the event giving rise to such liability.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Limitations on Damages:&nbsp;</b>
                      In no event shall Avrij Inc. be liable for any damages arising from<br />
                      a) your use of or reliance on Talent Scope AI or any insights, reports, analyses, or other information provided by the Application;<br />
                      b) any unauthorized access to or alteration of your transmissions or data;<br />
                      c) any actions taken or not taken based on the information provided by the Application; or<br />
                      d) any Third-Party Services integrated with the Application.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Basis of the Bargain:&nbsp;</b>
                      You acknowledge that Avrij Inc. has set its prices and entered into this Agreement in reliance upon the limitations of liability set forth herein, and that these limitations are an essential basis of the bargain between you and Avrij Inc.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Jurisdictional Limitations:&nbsp;</b>
                      Some jurisdictions do not allow the exclusion or limitation of certain damages. If these laws apply to you, some or all of the above exclusions or limitations may not apply to you, and you may have additional rights.
                    </Typography>
                  </li>
                </ol>

                <Typography>
                  The limitations and exclusions of liability set forth in this section shall apply regardless of the form of action, whether in contract, tort (including negligence), strict liability, or otherwise, and shall survive the termination of this Agreement or your use of Talent Scope AI.
                </Typography>
                <br />

                <Typography variant="h3">Indemnification</Typography>
                <Typography>
                  You agree to indemnify, defend, and hold harmless Avrij Inc., its affiliates, directors, employees, agents, suppliers, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or in connection with:
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Your Use of Talent Scope AI:&nbsp;</b>
                      Your use of Talent Scope AI, including but not limited to any content you upload, analyze, or share through the Application, or any insights, reports, or analyses generated by the Application based on your uploaded content;
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Violation of this Agreement:&nbsp;</b>
                      Your violation of this Agreement or any applicable laws, rules, or regulations;
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Infringement of Intellectual Property Rights:&nbsp;</b>
                      Your infringement or misappropriation of any intellectual property rights or other rights of Avrij Inc. or any third party;
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Third-Party Claims:&nbsp;</b>
                      Any claims brought by a third party against Avrij Inc. arising out of or in connection with your use of Talent Scope AI or your violation of this Agreement; and
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      <b>Unauthorized Use of Your Account:&nbsp;</b>
                      Any unauthorized use of your account or any other breach of security related to your account.
                    </Typography>
                  </li>
                </ol>

                <Typography>
                Avrij Inc. reserves the right, at its own expense, to assume the exclusive defense and control of any matter subject to indemnification by you, in which event you shall cooperate with Avrij Inc. in asserting any available defenses.
                <br /><br />
                This indemnification obligation shall survive the termination of this Agreement and your use of Talent Scope AI.
                </Typography>
                <br />

                <Typography variant="h3">Termination and Account Cancellation</Typography>
                <Typography>
                  This section outlines the terms and conditions related to the termination of this Agreement and the cancellation of your Talent Scope AI account.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Termination by Avrij Inc:&nbsp;</b>
                      Avrij Inc. reserves the right to suspend, limit, or terminate your access to Talent Scope AI and this Agreement at any time, without notice and for any reason, including but not limited to: a. Your violation of this Agreement or any applicable laws, rules, or regulations; b. Your infringement or misappropriation of any intellectual property rights or other rights of Avrij Inc. or any third party; c. Your failure to pay any fees or charges associated with your use of the Application; d. Any unauthorized access to or use of your account; e. Any conduct that Avrij Inc., in its sole discretion, believes is harmful to the Application, its users, or its business interests.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Termination by You:&nbsp;</b>
                      You may terminate this Agreement and cancel your Talent Scope AI account at any time by contacting Avrij Inc. at the email address provided in the "Contact Information" section of this Agreement. Upon termination, your right to access and use the Application will cease immediately.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Effect of Termination:&nbsp;</b>
                      Upon termination of this Agreement, whether by you or by Avrij Inc.:<br />
                      a) Your right to access and use Talent Scope AI will terminate immediately;<br />
                      b) Any licenses granted to you under this Agreement will terminate;<br />
                      c) You must cease all use of the Application and delete any copies of the Application in your possession;<br />
                      d) Avrij Inc. may delete all of your data and content associated with your account, including any uploaded content, insights, reports, and analyses; and<br />
                      e) Any provisions of this Agreement that by their nature should survive termination shall survive termination, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>No Refunds:&nbsp;</b>
                      In the event of termination, you shall not be entitled to any refunds of fees or charges paid in connection with your use of Talent Scope AI.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Suspension of Access:&nbsp;</b>
                      Avrij Inc. reserves the right to suspend your access to Talent Scope AI, without notice and for any reason, including but not limited to scheduled maintenance, upgrades, or any suspected or actual breach of security or unauthorized access to the Application.
                    </Typography>
                  </li>
                </ol>

                <Typography>
                  By using Talent Scope AI, you acknowledge and agree to these terms regarding termination and account cancellation. If you have any questions about terminating your account, please contact us using the information provided in the "Contact Information" section of this Agreement.
                </Typography>
                <br />

                <Typography variant="h3">Modifications to the User Agreement</Typography>
                <Typography>
                  Avrij Inc. reserves the right to modify, update, or replace any part of this User Agreement at any time and at its sole discretion. When changes are made, Avrij Inc. will revise the "Last Updated" date at the top of this Agreement.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Notification of Changes:&nbsp;</b>
                      Avrij Inc. will make reasonable efforts to notify you of any material changes to this User Agreement. Such notification may be provided by email to the address associated with your account, by posting a notice within Talent Scope AI, or by other means deemed appropriate by Avrij Inc.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Acceptance of Changes:&nbsp;</b>
                      Your continued use of Talent Scope AI following the posting of any changes to this User Agreement constitutes your acceptance of those changes. If you do not agree to the modified terms, you must stop using the Application.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Review of User Agreement:&nbsp;</b>
                      It is your responsibility to periodically review this User Agreement for any changes. The most current version of the User Agreement will always be available within the Application or on Avrij Inc.'s website.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Material Changes:&nbsp;</b>
                      If Avrij Inc. makes any material changes to this User Agreement that significantly affect your rights or obligations, we will provide you with additional notice, such as by sending you an email or displaying a prominent notice within Talent Scope AI. Material changes will take effect no sooner than thirty (30) days after the additional notice is provided.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Continued Use:&nbsp;</b>
                      Your continued use of Talent Scope AI after the effective date of any modifications to this User Agreement means that you accept and agree to the modified terms. If you object to any changes, your sole recourse is to stop using the Application and terminate your account.
                    </Typography>
                  </li>
                </ol>

                <Typography>
                  By using Talent Scope AI, you acknowledge and agree to these terms regarding modifications to the User Agreement. We encourage you to frequently review this Agreement to stay informed about our practices and your rights and obligations.
                </Typography>
                <br />

                <Typography variant="h3">Governing Law and Dispute Resolution</Typography>
                <Typography>
                  This section outlines the governing law and dispute resolution processes applicable to this User Agreement and your use of Talent Scope AI.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Governing Law:&nbsp;</b>
                      This User Agreement and any disputes arising out of or related to your use of Talent Scope AI shall be governed by and construed in accordance with the laws of the State of [insert state], without regard to its conflict of law provisions.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Informal Dispute Resolution:&nbsp;</b>
                      In the event of any dispute, claim, or controversy arising out of or relating to this User Agreement or your use of Talent Scope AI, you and Avrij Inc. agree to first attempt to resolve the dispute informally. You must send a written notice of the dispute to Avrij Inc. at the address provided in the "Contact Information" section of this Agreement. Avrij Inc. will send a written notice of the dispute to the email address associated with your account. You and Avrij Inc. agree to negotiate in good faith to resolve the dispute within thirty (30) days from the date of the initial notice.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Binding Arbitration:&nbsp;</b>
                      If you and Avrij Inc. are unable to resolve the dispute informally, you agree that any dispute, claim, or controversy arising out of or relating to this User Agreement or your use of Talent Scope AI shall be resolved through binding arbitration. The arbitration shall be conducted by a single arbitrator in accordance with the rules of the American Arbitration Association ("AAA"). The arbitration shall take place in [insert city and state], and the arbitrator shall apply the laws of the State of [insert state], without regard to its conflict of law provisions.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Exceptions to Arbitration:&nbsp;</b>
                      Notwithstanding the foregoing, either party may seek injunctive relief or other equitable remedies in any court of competent jurisdiction to protect its intellectual property rights or enforce the provisions of this User Agreement.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Waiver of Class Actions:&nbsp;</b>
                      You and Avrij Inc. agree that any arbitration or legal proceedings shall be conducted only on an individual basis and not in a class, consolidated, or representative action. You waive your right to participate in a class action lawsuit or class-wide arbitration.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Limitation on Time to File Claims:&nbsp;</b>
                      Any cause of action or claim you may have arising out of or relating to this User Agreement or your use of Talent Scope AI must be commenced within one (1) year after the cause of action accrues; otherwise, such cause of action or claim is permanently barred.
                    </Typography>
                    <br />
                  </li>
                </ol>

                <Typography>
                  By using Talent Scope AI, you acknowledge and agree to these terms regarding governing law and dispute resolution. If you have any questions about this section, please contact us using the information provided in the "Contact Information" section of this Agreement.
                </Typography>
                <br />

                <Typography variant="h3">Severability</Typography>
                <Typography>
                  If any provision of this User Agreement is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. In such cases, the invalid, illegal, or unenforceable provision shall be modified or interpreted in a manner that best reflects the original intention of the provision, to the extent permitted by applicable law.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Severability of Provisions:&nbsp;</b>
                      If any court or arbitrator of competent jurisdiction deems any provision of this User Agreement invalid, illegal, or unenforceable, such invalidity, illegality, or unenforceability shall not affect the remaining provisions of this Agreement, which shall remain in full force and effect.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Modification of Invalid Provisions:&nbsp;</b>
                      If any provision of this User Agreement is deemed invalid, illegal, or unenforceable, Avrij Inc. shall have the right to modify the provision to the extent necessary to make it valid, legal, and enforceable, while preserving its original intent to the greatest extent possible.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Severability and Enforceability:&nbsp;</b>
                      The invalidity, illegality, or unenforceability of any provision of this User Agreement shall not affect the validity, legality, or enforceability of any other provision of this Agreement or the validity, legality, or enforceability of the offending provision in any other jurisdiction
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Headings and Interpretation:&nbsp;</b>
                      The section headings in this User Agreement are for convenience only and shall not affect the interpretation of any provisions. The words "including," "such as," and similar phrases shall be interpreted as introducing examples and not as limiting the generality of any preceding words.
                    </Typography>
                  </li>
                </ol>

                <Typography>
                  By using Talent Scope AI, you acknowledge and agree to this severability provision. If you have any questions about the enforceability of any part of this User Agreement, please contact us using the information provided in the "Contact Information" section of this Agreement.
                </Typography>
                <br />

                <Typography variant="h3">Entire Agreement</Typography>
                <Typography>
                  This User Agreement, together with the Privacy Policy and any other legal notices or additional terms and conditions published by Avrij Inc. within Talent Scope AI or on its website, constitutes the entire agreement between you and Avrij Inc. with respect to your use of the Application and supersedes all prior or contemporaneous communications and proposals, whether oral or written, between you and Avrij Inc.
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      <b>Integration:&nbsp;</b>
                      This User Agreement represents the complete and exclusive understanding between you and Avrij Inc. regarding your use of Talent Scope AI. No other agreements, representations, warranties, or commitments, whether oral or written, shall be binding upon either party unless expressly stated in this Agreement.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Waiver:&nbsp;</b>
                      The failure of Avrij Inc. to enforce any right or provision of this User Agreement shall not be deemed a waiver of such right or provision. Any waiver of any provision of this Agreement must be made in writing and signed by an authorized representative of Avrij Inc.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Assignment:&nbsp;</b>
                      You may not assign or transfer this User Agreement, by operation of law or otherwise, without the prior written consent of Avrij Inc. Any attempt by you to assign or transfer this Agreement without such consent will be null and void. Avrij Inc. may freely assign or transfer this Agreement without restriction.
                    </Typography>
                    <br />
                  </li>
                  <li>
                    <Typography>
                      <b>Relationship of the Parties:&nbsp;</b>
                      Nothing in this User Agreement shall be construed as creating a partnership, joint venture, employment, or agency relationship between you and Avrij Inc. Neither party shall have the authority to bind the other party or incur any obligations on behalf of the other party without the other party's prior written consent.
                    </Typography>
                  </li>
                </ol>

                <Typography>
                  By using Talent Scope AI, you acknowledge that you have read, understood, and agree to be bound by this User Agreement in its entirety. If you do not agree to this Agreement, you must not use the Application.
                </Typography>
                <br />

                <Typography variant="h3">Conclusion and Contact Information</Typography>
                <Typography>
                  Thank you for reviewing the Talent Scope AI User Agreement. We hope this document has provided you with a clear understanding of the terms and conditions governing your use of the Application. By using Talent Scope AI, you acknowledge that you have read, understood, and agree to be bound by this Agreement.
                  <br />
                  <br />
                  If you have any questions, concerns, or feedback regarding this User Agreement or your use of Talent Scope AI, please don't hesitate to contact us. We value your input and are committed to providing you with the best possible experience while using our Application.
                </Typography>

                <b>Contact Information Avrij Inc.</b>
                <a href="mailto:contact@avrij.com">contact@avrij.com</a>
                <a href="tel:819-639-2530">819-639-2530</a>

                <Typography>
                  Please note that this contact information is for inquiries related to the Talent Scope AI User Agreement and general support. For technical support or issues with your account, please use the support channels provided within the Application.
                  <br />
                  <br />
                  We appreciate your trust in Avrij Inc. and look forward to providing you with valuable insights and analytics through Talent Scope AI. Thank you for being a part of our community.
                  <br />
                  <br />
                  Best regards, The Avrij Inc. Team
                </Typography>

              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </Container>
    </HeaderWrapper>
  );
};

export default PrivacyPolicy;
