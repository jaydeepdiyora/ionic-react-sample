import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "./Users.css";
import UserCard from "../components/UserCard";
import { GetUser, UserEntity } from "../model/model";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../environments/environment";

const Users: React.FC = () => {
  const [users, setUser] = useState<UserEntity[]>();
  const ionList = useRef<HTMLIonListElement>(null);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch(`${API_URL}?results=100`, {
      method: "get",
    })
      .then(async (res) => {
        const userData: GetUser = await res.json();
        console.log('user data',userData);
        
        if (userData) {
          setUser(userData.results || []);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (id: string) => {
    const newList = users?.filter((e) => e.login.uuid !== id);
    setUser(newList);
    ionList.current?.closeSlidingItems();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">All Users</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList ref={ionList}>
          {users?.length &&
            users.map((user, key) => {
              return (
                <UserCard
                  key={key}
                  user={user}
                  deleteUser={(id) => {
                    presentAlert({
                      header: "Are you sure?",
                      message: "Are you sure want to delete this user?",
                      buttons: [
                        {
                          text: "Cancel",
                          role: "cancel",
                        },
                        {
                          text: "Delete",
                          role: "confirm",
                          cssClass:'color-danger',
                          handler: () => {
                            deleteUser(id);
                          },
                        },
                      ],
                    });
                  }}
                />
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Users;
