import { StyleSheet, Platform } from 'react-native';

let paddingTop = 0;
let paddingBottom = 0;

if(Platform.OS === "ios")
{
  paddingTop = 40;
  paddingBottom = 15;
}
if(Platform.OS === "android")
{
  paddingTop = 20;
  paddingBottom = 0;
}

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingTop ,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: paddingBottom,
    backgroundColor: "#EEEEEE"
  },
  header: {
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    backgroundColor: "#2b3362",
    zIndex: 2,
    elevation: 2,
  },
  title: {
    fontSize:25,
    padding: 20,
    height: 80,
    backgroundColor: "#2b3362",
    color: "#FFFFFF",
  },
  titleSwipe: {
    color: "#2b3362",
    backgroundColor: "#FFFFFF",
    width: 100,
    height: 80,
    fontSize: 20,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    opacity: 0.5,
  },
  photo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginTop: 15,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: 'flex-end',
  },
  menu: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "#2b3362",
    color: "#FFFFFF",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  centeredButton: {
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',
    color: "#FFFFFF",
  },
  item: {
    fontSize: 20,
    margin: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    margin: 10
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  card: {
    borderRadius: 15,
    margin: 5,
    height: 70,
    backgroundColor: "#FFFFFF",
    zIndex: 1,
    elevation: 1
  },
  swipeLeft: {
    backgroundColor: "#2b3362",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    width: 100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    opacity: 0.5,
  },
  swipeRight: {
    backgroundColor: "#2b3362",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 0,
    width: 100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    opacity: 0.5,
  },
  flexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlignVertical: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    margin: 10
  },
  paper: {
    backgroundColor: "#d0e2f5",
    height: 60,
  },
  paperSwipe: {
    backgroundColor: "#2b3362",
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    opacity: 0.5,
  },
  row: {
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  footer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#2b3362",
    paddingTop: 10,
    paddingBottom: 30,
    color:"#FFFFFF"
  },
  cardContainer: {
    borderRadius: 15,
    margin: 5,
    backgroundColor: "#FFFFFF",
    padding: 10
  },
  button: {
    backgroundColor:'#2b3362', 
    color:'#FFFFFF', 
    paddingVertical:5, 
    paddingHorizontal:20, 
    borderRadius:10
  },
});