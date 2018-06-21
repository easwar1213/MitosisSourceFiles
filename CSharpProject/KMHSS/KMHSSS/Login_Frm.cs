using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace KMHSSS
{
    public partial class Login_Frm : Form
    {
        string query;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        SqlConnection con1 = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Login_Frm()
        {
            InitializeComponent();
        }

        void shf_FormClosed(object sender, FormClosedEventArgs e)
        {
            this.Show();
        }

        private void Login_Btn_Click(object sender, EventArgs e)
        {
            if (Uname_Txt.Text != "" && Pwd_Txt.Text != "")
            {
                try
                {
                    query = "select User_Name,Password,Login_Type from Login_Table where User_Name='" + Uname_Txt.Text.Trim() + "' AND Password='" + Pwd_Txt.Text + "' AND Login_Type='"+Login_Type_CBox.Text.Trim()+"'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        dr.Read();
                        if (dr.GetValue(0).ToString() == Uname_Txt.Text.Trim() && dr.GetValue(1).ToString().Trim() == Pwd_Txt.Text && dr.GetValue(2).ToString().Trim() == "Admin")
                        {
                            
                            KMHSS_Admin_Home_Frm ahf = new KMHSS_Admin_Home_Frm();
                            ahf.FormClosed += new FormClosedEventHandler(shf_FormClosed);
                            //MessageBox.Show("Welcome To Kandasamy Matriculation Higher School", "Admin");
                            this.Hide();
                            ahf.Show();                       
                           
                            query = "update Logined_Table set Logined='"+Login_Type_CBox.Text+"'";
                            cmd = new SqlCommand(query, con1);
                            con1.Open();
                            cmd.ExecuteNonQuery();
                            //MessageBox.Show("Updated Successfully");
                            con1.Close();                            
                        }
                        else if (dr.GetValue(0).ToString() == Uname_Txt.Text.Trim() && dr.GetValue(1).ToString().Trim() == Pwd_Txt.Text && dr.GetValue(2).ToString().Trim() == "Staff")
                        {                            
                            Staff_Home_Frm shf = new Staff_Home_Frm();
                            shf.FormClosed += new FormClosedEventHandler(shf_FormClosed);
                            //MessageBox.Show("Welcome To Kandasamy Matriculation Higher School", "Staff");
                            this.Hide();
                            shf.Show();
                            query = "update Logined_Table set Logined='" + Login_Type_CBox.Text + "'";
                            cmd = new SqlCommand(query, con1);
                            con1.Open();
                            cmd.ExecuteNonQuery();
                            //MessageBox.Show("Updated Successfully");
                            con1.Close();
                        }
                        else
                        {
                            MessageBox.Show("Username or Password Mismatch", "Alert", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            Uname_Txt.Text = "";
                            Pwd_Txt.Text = "";
                            Login_Type_CBox.Text = "";
                            Uname_Txt.Focus();
                        }
                        dr.Close();
                        con.Close();
                    }
                    else
                    {
                        MessageBox.Show("Username or Password Mismatch", "Alert", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        Uname_Txt.Text = "";
                        Pwd_Txt.Text = "";
                        Login_Type_CBox.Text = "";
                        Uname_Txt.Focus();
                    }

                    con.Close();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show("Error : " + Ex.Message.ToString());
                }
            }
            else
            {
                MessageBox.Show("Please Enter UserName & Password", "Alert", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Uname_Txt.Text = "";
                Pwd_Txt.Text = "";
                Login_Type_CBox.Text = "";
                Uname_Txt.Focus();
            }
        }

        private void Cancel_Btn_Click(object sender, EventArgs e)
        {
            Environment.Exit(0);
        }  

        private void Uname_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Uname_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Pwd_Txt.Focus();
                }
            }
        }

        private void Pwd_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Pwd_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Login_Type_CBox.Focus();
                }
            }
        }

        private void Login_Type_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Login_Type_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Login_Btn.Focus();
                }
            }
        }
    }
}
