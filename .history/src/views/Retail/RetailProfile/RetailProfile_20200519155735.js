import React,{Component} from "react";
import {uniqueId} from 'lodash';

import filesize from 'filesize';
// @material-ui/core components
// import InputLabel from "@material-ui/core/InputLabel";
// import {Button} from "@material-ui/core";
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Upload from "../../../components/Upload"
import FileList from "../../../components/FileList"



import api from "../../../services/api"
import { getId } from "../../../services/auth"


export default class UserProfile extends Component {
  state = {
    uploadedFiles : [],
  }
  async componentDidMount(){
    await api.post(`/files/${getId()}`)
      .then(response =>
          this.setState({
            uploadedFiles: response.data.map(file => ({
              id: file.id,
              name: file.name,
              size: file.size,
              readableSize: filesize(file.size),
              preview: file.url,
              uploaded:true,
              url:file.url,
            }))
          })
        );
  }
  
  componentWillUnmount(){
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }
  
  handleUpload = files => {
    
    const uploadedFiles = files.map(file => (file.size < 2100000 ? {
      file,
      id: uniqueId(),
      name: file.name,
      size: file.size,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress:0,
      uploaded:false,
      error:false,
      msg:'',
      url:null
    }: {
      file,
      id: uniqueId(),
      name: file.name,
      size: file.size,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress:0,
      uploaded:false,
      error:true,
      msg:'',
      url:null
    }));
    
    this.setState({
      uploadedFiles: uploadedFiles
    });
    
    uploadedFiles.forEach(this.processUpload)
    
  }
  updateFile = (id,data) => {
    this.setState({uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
      return id === uploadedFile.id ? {...uploadedFile,...data} : uploadedFile;
    })
  })
};

processUpload = (uploadedFile) => {
  
  if(!uploadedFile.error){const data = new FormData();
    
    data.append('file', uploadedFile.file, uploadedFile.name);
    data.append('retail_id',getId());
    
    api.post('/files', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));
        
        
        this.updateFile(uploadedFile.id, { progress });
      }
    })
    .then(response =>{
      this.updateFile(uploadedFile.id, {
        uploaded:true,
        id: response.data.id,
        url:response.data.url
      });
    })
    .catch(error =>{
      // console.log(error.response.data.error.message);
      this.updateFile(uploadedFile.id, {
        error:true,
        msg: error.response.data.error.message
      })
    })}
    
  }

  handleDelete = async id => {
    await api.delete(`/files/${id}`);
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  
  }
  
  render(){
    const { uploadedFiles } = this.state;
    // const check = !! uf
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success"> <h4 style={{
                  color: "rgba(255,255,255,1)",
                  margin: "0",
                  fontSize: "18px",
                  marginTop: "0",
                  marginBottom: "10px"
                }}>Upload de Logomarca</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs>
                  <Upload onUpload={this.handleUpload}/>
                  {!!uploadedFiles
                    && <FileList files={uploadedFiles} onDelete={this.handleDelete} />
                  }
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
            {/* <Card>
              <CardHeader color="success">
                <h4 style={{
                  color: "rgba(255,255,255,1)",
                  margin: "0",
                  fontSize: "18px",
                  marginTop: "0",
                  marginBottom: "10px"
                }}>Editar Perfil</h4>
                <p style={{
                  color: "rgba(255,255,255,.62)",
                  margin: "0",
                  fontSize: "14px",
                  marginTop: "0",
                  marginBottom: "0"
                }}>Complete seu perfil</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Empresa"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Usuário"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Endereço de Email"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nome"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Sobrenome"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Cidade"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="País"
                      id="country"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="CEP"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
               
              </CardBody>
              <CardFooter>            
                <Button fullWidth color="success">Atualizar Pefil</Button>
              </CardFooter>
            </Card> */}
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>Alec Thompson</h4>
                <p className={classes.description}>
                  Don{"'"}t be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves Kanye
                  I love Rick Owens’ bed design but the back is...
                </p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem> */}
        </GridContainer>
      </div>
    );
  }
}