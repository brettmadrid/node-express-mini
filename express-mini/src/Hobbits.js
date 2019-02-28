import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Hobbits = props => {
  return (
    <Card className="hobbits">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.hobbit.name}
        </Typography>
        <Typography component="p">{props.hobbit.bio}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => props.deleteHobbit(props.hobbit.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Hobbits;
