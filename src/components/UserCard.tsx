import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import "./UserCard.css";
import { UserEntity } from "../model/model";
import { location, call, trashOutline } from "ionicons/icons";

interface ContainerProps {
  user: UserEntity;
  deleteUser: (id: string) => void;
}

const UserCard: React.FC<ContainerProps> = ({ deleteUser, user }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonAvatar slot="start" className="user-avatar">
          <img src={user.picture.thumbnail} alt="User avatar" />
        </IonAvatar>
        <IonLabel className="item-label">
          <h1 className="title">
            {user?.name?.title}. {user?.name?.first} {user?.name?.last}
          </h1>
          <p className="flex">
            <IonIcon icon={location}></IonIcon> {user.location.country}
          </p>
          <p className="flex">
            <IonIcon icon={call}></IonIcon> {user.cell || user.phone}
          </p>
        </IonLabel>
      </IonItem>

      <IonItemOptions>
        <IonItemOption
          color="danger"
          onClick={() => deleteUser(user.login.uuid)}
        >
          <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default UserCard;
