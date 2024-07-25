import { Layout, Menu } from "antd";
import "./globals.css";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";


const items=[
  {key:"home",label:<Link href={"/"}>Home</Link>},
  {key:"Specification",label:<Link href={"/Specification"}>Specification</Link>},
  {key:"Order",label:<Link href={"/Order"}>Order</Link>},
  {key:"Storage",label:<Link href={"/Storage"}>Storage</Link>},
  {key:"Node",label:<Link href={"/Node"}>Node</Link>},
  {key:"Deficit", label:<Link href={"/Deficit"}>Deficit</Link>}
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout style ={{minHeight:"100vh"}}>
          <Header>
            <Menu theme="dark" 
            mode="horizontal" 
            items={items} 
            style={{flex:1, minWidth:0}} />
          </Header>
          <Content style={{padding:"0 48px"}}> {children}</Content>
          <Footer style={{textAlign:"center"}}>
            Created with love by Nikita
          </Footer>
        </Layout>
      </body>
    </html>
  );
}