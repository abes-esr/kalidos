import { Card, ListGroup, Badge, Row, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import { setNoticeDisplay } from '../../actions/index';


const mapStateToProps = (state) => ({
    noticeDisplay: state.displayVerif.noticeDisplay
});
  
const mapDispatchToProps = (dispatch) => ({
  SetNoticeDisplay: (IDnotice) => dispatch(setNoticeDisplay(IDnotice))
});

let idListGroup = 0;

function TabNotice({ listNotices, SetNoticeDisplay, noticeDisplay }) {
  return (
    <div>
      <Card style={{ width: "18rem", maxWidth: "100%" }}>
        <ListGroup variant="flush">
          {listNotices.map((row) => {
            idListGroup++;
            let styleBackground = {};
            if (noticeDisplay == row[0]) {
              styleBackground = {
                backgroundColor: "#f2f2f2",
                color: "#757A8C",
                fontWeight: "bold",
              };
            }
            return (
              <ListGroup.Item
                key={idListGroup}
                onClick={() => SetNoticeDisplay(row[0])}
                className={"listGroupPPN"}
                style={styleBackground}
              >
                {row[0]}
                <Badge
                  style={{ float: "right", fontSize: "100%" }}
                  variant="danger"
                >
                  {row[1].length}
                </Badge>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabNotice));  
