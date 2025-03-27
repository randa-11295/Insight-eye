import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, Email } from "@mui/icons-material";

const socialLinks = [
  { name: "Facebook", icon: <Facebook />, url: "https://www.facebook.com/gateworx.net" },
  { name: "LinkedIn", icon: <LinkedIn />, url: "https://www.linkedin.com/company/gateworx/posts/?feedView=all" },
  { name: "Email", icon: <Email />, url: "mailto:Insighteye@gateworx.net" }
];

const SocialMediaLinks = () => {
  return (
    <Box display="flex" justifyContent={{sx: "center" ,md :"flex-start"}} gap={2}>
      {socialLinks.map((link, index) => (
        <Tooltip key={index}  title={link.name} placement="top" >
          <IconButton color="primary" component="a" href={link.url} target="_blank">
            {link.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default SocialMediaLinks;