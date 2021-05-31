import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
    align-self: center;
    margin-bottom: 30px;
`;

const StyledImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: ${({theme}) => theme.profileBackground};
`;

const ProfileImage = ({ url, imageStyle }) => {
    return(
        <Container>
            <StyledImage source={{ uri: url }} style={imageStyle} />
        </Container>
    );
};

ProfileImage.prototype = {
    uri: PropTypes.string,
    imageStyle: PropTypes.object,
}

export default ProfileImage;