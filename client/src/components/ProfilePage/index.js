import React, { useState, useEffect } from 'react';
import {
  Card, Layout, Row, Col, Icon, Button, Spin,
} from 'antd';
import { Redirect } from 'react-router-dom';
import MainHeader from '../MainHeader';
import { ProfileContainer } from './style';
import { useHomeContext } from '../../context/HomeContext';
import { useApi } from '../../custom-hooks';
import ProfileEditForm from './profile-edit-form';
import { updateUser } from '../../API';

const { Meta } = Card;

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const {
    user, teamsMap, teamIds, setUser,
  } = useHomeContext();
  const [data, loadData, loading, resetData] = useApi(updateUser, null);

  const handleEditFormSubmit = (formData) => {
    loadData(user._id, formData);
  };

  useEffect(() => {
    if (data && data.data && data.data._id && editMode) {
      setUser(data.data);
      resetData();
      setEditMode(false);
    }
  }, [data, editMode, resetData, setUser]);

  const EditFormInitialValues = {
    username: { value: user.username },
    tagLine: { value: user.tagLine },
    avatar: { value: user.avatar },
  };

  if (!user || !user._id) {
    return <Redirect to="/" />;
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <MainHeader />
      <Layout style={{ height: '100%' }}>
        <ProfileContainer>
          <Spin spinning={loading}>
            {editMode && (
              <ProfileEditForm
                {...EditFormInitialValues}
                handleFormSubmit={handleEditFormSubmit}
                cancelEdit={() => setEditMode(false)}
              />
            )}
            {!editMode && (
              <Row className="container-row">
                <Col md={6}>
                  <Card
                    hoverable
                    style={{ width: '100%', maxWidth: '300px', margin: 'auto' }}
                    cover={<img alt="example" src={user.avatar} />}
                  >
                    <Meta title={user.username} style={{ textAlign: 'center' }} />
                  </Card>
                </Col>
                <Col md={18}>
                  <div style={{ padding: '15px' }}>
                    <h4>
                      <Icon type="user" /> Name{' '}
                    </h4>
                    <hr />
                    <p style={{ 'font-size': '20px' }}>{user.username}</p>
                    <h4>
                      <Icon type="tag" /> Tagline
                    </h4>
                    <hr />
                    <p style={{ 'font-size': '20px' }}>{user.tagLine}</p>
                    <h4>
                      <Icon type="mail" /> Email
                    </h4>
                    <hr />
                    <p style={{ 'font-size': '20px' }}>{user.email}</p>
                    <h4>
                      <Icon type="usergroup-add" /> Teams
                    </h4>
                    <hr />
                    <p style={{ 'font-size': '20px' }}>
                      {teamIds.map(teamId => teamsMap[teamId].name).join(', ')}
                    </p>
                    <Button
                      type="primary"
                      icon="edit"
                      onClick={() => setEditMode(true)}
                      size="large"
                    >
                      Edit Profile
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Spin>
        </ProfileContainer>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
