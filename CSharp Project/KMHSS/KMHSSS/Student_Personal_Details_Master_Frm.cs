using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Drawing.Imaging;
using System.IO;
using System.Data.SqlClient;
using Microsoft.VisualBasic;

namespace KMHSSS
{
    public partial class Student_Personal_Details_Master_Frm : Form
    {
        SqlCommand cmd;
        MemoryStream ms;
        byte[] photo_aray;
        string query, Admis_No;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Student_Personal_Details_Master_Frm()
        {
            InitializeComponent();
        }
       
        private void Student_Admission_Master_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                Class_CBox.Focus();
                Dob_Dtp.Value = DateTime.Now;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
                Class_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Class_CBox()
        {
            try
            {
                Class_CBox.Items.Clear();
                query = "select Class from Class_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Class_CBox.Items.Add(dr["Class"].ToString());
                    PClass_CBox.Items.Add(dr["Class"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Section_CBox()
        {
            try
            {
                Sec_CBox.Items.Clear();
                query = "select Section from Section_Master_Table where Class='" + Class_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Sec_CBox.Items.Add(dr["Section"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Admission_No_CBox()
        {
            try
            {
                Admission_No_CBox.Items.Clear();
                query = "select Admission_No from Student_Admission_Master_Table where Class='"+Class_CBox.Text +"' and Section='"+Sec_CBox.Text +"'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admission_No_CBox.Items.Add(dr["Admission_No"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }       
       
        public void Clear_Controls()
        {
            try
            {
                Admission_No_CBox.Text="";
                Std_Name_Txt.Text = "";
                Father_Name_Txt.Text = "";
                Mother_Name_Txt.Text = "";
                Dob_Dtp.Text = "";
                Gender_CBox.Text = "";
                Address_Txt.Text = "";
                Father_Occ_Txt.Text = "";
                Mother_Occ_Txt.Text = "";
                PStudy_CBox.Text = "";
                School_Name_Txt.Text = "NIL";
                PClass_CBox.Text = "NIL";                
                Class_CBox.Text = "";
                Sec_CBox.Text = "";
                Group_Code_Txt.Text = "NIL";
                Branch_Txt.Text = "NIL";
                Father_Mob_Txt.Text = "";
                Mother_Mob_Txt.Text = "";
                Email_Txt.Text = "";
                Nationality_Txt.Text = "INDIAN";
                Religion_CBox.Text = "";
                Community_CBox.Text = "";
                Caste_Txt.Text = "";
                Identy1_Txt.Text = "NIL";
                Identy2_Txt.Text = "NIL";
                Father_Income_Txt.Text = "";
                Mother_Income_Txt.Text = "";
                Admis_Date_Txt.Text = "";                
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void conv_photo()
        {
            if (Std_Image_PBox.Image != null)
            {
                //using FileStream:(will not work while updating, if image is not changed)
                //FileStream fs = new FileStream(openFileDialog1.FileName, FileMode.Open, FileAccess.Read);
                //byte[] photo_aray = new byte[fs.Length];
                //fs.Read(photo_aray, 0, photo_aray.Length);  

                //using MemoryStream:
                ms = new MemoryStream();
                Std_Image_PBox.Image.Save(ms, ImageFormat.Jpeg);
                byte[] photo_aray = new byte[ms.Length];
                ms.Position = 0;
                ms.Read(photo_aray, 0, photo_aray.Length);
                cmd.Parameters.AddWithValue("@photo", photo_aray);
            }
        }

        public void Add()
        {
            if (Admission_No_CBox.Text != "" && Std_Name_Txt.Text != "" && Father_Name_Txt.Text != "" && Mother_Name_Txt.Text != "" && Dob_Dtp.Text != "" && Gender_CBox.Text != "" && Address_Txt.Text != "" && Father_Occ_Txt.Text != "" && Mother_Occ_Txt.Text != "" && PStudy_CBox.Text != "" && Class_CBox.Text != "" && Father_Mob_Txt.Text != "" && Nationality_Txt.Text != "" && Email_Txt.Text != "" && Religion_CBox.Text != "" && Community_CBox.Text != "" && Caste_Txt.Text != "" && Identy1_Txt.Text != "" && Identy2_Txt.Text != "" && Father_Income_Txt.Text != "" && Mother_Income_Txt.Text != "" && Admis_Date_Txt.Text != "" && Std_Image_PBox.Image != null)
            {
                try
                {
                    query = "insert into Student_Personal_Details_Master_Table values('" + Admission_No_CBox.Text + "','" + Admis_Date_Txt.Text + "','" + Std_Name_Txt.Text + "','" + Father_Name_Txt.Text + "','" + Mother_Name_Txt.Text + "','" + Dob_Dtp.Text + "','" + Gender_CBox.Text + "','" + Address_Txt.Text + "','" + Father_Occ_Txt.Text + "','" + Mother_Occ_Txt.Text + "','" + PStudy_CBox.Text + "','" + School_Name_Txt.Text + "','" + PClass_CBox.Text + "','" + Class_CBox.Text + "','" + Sec_CBox.Text + "','" + Group_Code_Txt.Text + "','" + Branch_Txt.Text + "','" + Email_Txt.Text + "','" + Father_Mob_Txt.Text + "','" + Mother_Mob_Txt.Text + "','" + Nationality_Txt.Text + "','" + Religion_CBox.Text + "','" + Community_CBox.Text + "','" + Caste_Txt.Text + "','" + Identy1_Txt.Text + "','" + Identy2_Txt.Text + "'," + Father_Income_Txt.Text + "," + Mother_Income_Txt.Text + ",@photo)";
                    cmd = new SqlCommand(query, con);
                    conv_photo();
                    con.Open();
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Inserted Successfully");
                    con.Close();
                    Clear_Controls();
                    Class_CBox.Focus();
                }
                catch (Exception Ex)
                {

                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Fill All the Fields!!!");
            }
        }
       
        private void Edit_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Clear_Controls();
                Admis_No = Interaction.InputBox("Enter the Admission No:", "Edit Admission Details", "", 50, 20);
                fill_Admission(Admis_No);
                con.Close();
                Group_Code_Lbl.Visible = true;
                Group_Code_Txt.Visible = true;
                Branch_Lbl.Visible = true;
                Branch_Txt.Visible = true;
                School_Name_Txt.Visible = true;
                PClass_CBox.Visible = true;
                School_Name_Lbl.Visible = true;
                PClass_Lbl.Visible = true;              
               
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Admission(string Admis_No)
        {
            try
            {
                query = "select * from Student_Personal_Details_Master_Table where Admission_No='" + Admis_No + "'";
                con.Open();
                cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admission_No_CBox.Text  = dr["Admission_No"].ToString();
                    Admis_Date_Txt.Text = dr["Admis_Date"].ToString();
                    Std_Name_Txt.Text = dr["Std_Name"].ToString();
                    Father_Name_Txt.Text = dr["Father_Name"].ToString();
                    Mother_Name_Txt.Text = dr["Mother_Name"].ToString();
                    Dob_Dtp.Text = dr["Dob"].ToString();
                    Gender_CBox.Text = dr["Gender"].ToString();
                    Address_Txt.Text = dr["Address"].ToString();
                    Father_Occ_Txt.Text = dr["Father_Occupation"].ToString();
                    Mother_Occ_Txt.Text = dr["Mother_Occupation"].ToString();
                    PStudy_CBox.Text = dr["PStudy"].ToString();
                    School_Name_Txt.Text = dr["School_Name"].ToString();
                    PClass_CBox.Text = dr["PClass"].ToString();
                    Class_CBox.Text = dr["Class"].ToString();
                    Sec_CBox.Text  = dr["Section"].ToString();
                    Group_Code_Txt.Text = dr["Group_Code"].ToString();
                    Branch_Txt.Text = dr["Branch"].ToString();
                    Email_Txt.Text = dr["Email"].ToString();
                    Father_Mob_Txt.Text = dr["Father_Mob"].ToString();
                    Mother_Mob_Txt.Text = dr["Mother_Mob"].ToString();
                    Nationality_Txt.Text = dr["Nationality"].ToString();
                    Religion_CBox.Text = dr["Religion"].ToString();
                    Community_CBox.Text = dr["Community"].ToString();
                    Caste_Txt.Text = dr["Caste"].ToString();
                    Identy1_Txt.Text = dr["Identity1"].ToString();
                    Identy2_Txt.Text = dr["Identity2"].ToString();
                    Father_Income_Txt.Text = dr["FAIncome"].ToString();
                    Mother_Income_Txt.Text = dr["MAIncome"].ToString();
                    photo_aray = (byte[])dr["photo"];
                    MemoryStream ms = new MemoryStream(photo_aray);
                    Std_Image_PBox.Image = Image.FromStream(ms);
                }
                con.Close();
                Update_Btn.Enabled = true;
                Delete_Btn.Enabled = true;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

        }

        public void Updat()
        {
            if (Admission_No_CBox.Text != "" && Std_Name_Txt.Text != "" && Father_Name_Txt.Text != "" && Mother_Name_Txt.Text != "" && Dob_Dtp.Text != "" && Gender_CBox.Text != "" && Address_Txt.Text != "" && Father_Occ_Txt.Text != "" && Mother_Occ_Txt.Text != "" && PStudy_CBox.Text != "" && Class_CBox.Text != "" && Father_Mob_Txt.Text != "" && Nationality_Txt.Text != "" && Email_Txt.Text != "" && Religion_CBox.Text != "" && Community_CBox.Text != "" && Caste_Txt.Text != "" && Identy1_Txt.Text != "" && Identy2_Txt.Text != "" && Father_Income_Txt.Text != "" && Mother_Income_Txt.Text != "" && Admis_Date_Txt.Text != "")
            {
                try
                {
                    query = "update Student_Personal_Details_Master_Table set Std_Name='" + Std_Name_Txt.Text + "',Father_Name='" + Father_Name_Txt.Text + "',Mother_Name='" + Mother_Name_Txt.Text + "',Dob='" + Dob_Dtp.Text + "',Gender='" + Gender_CBox.Text + "',Address='" + Address_Txt.Text + "',Father_Occupation='" + Father_Occ_Txt.Text + "',Mother_Occupation='" + Mother_Occ_Txt.Text + "',PStudy='" + PStudy_CBox.Text + "',School_Name='" + School_Name_Txt.Text + "',PClass='" + PClass_CBox.Text + "',Class='" + Class_CBox.Text + "',Section='" + Sec_CBox.Text + "',Group_Code='" + Group_Code_Txt.Text + "',Branch='" + Branch_Txt.Text + "',Email='" + Email_Txt.Text + "',Father_Mob='" + Father_Mob_Txt.Text + "',Mother_Mob='" + Mother_Mob_Txt.Text + "',Nationality='" + Nationality_Txt.Text + "',Religion='" + Religion_CBox.Text + "',Community='" + Community_CBox.Text + "',Caste='" + Caste_Txt.Text + "',Identity1='" + Identy1_Txt.Text + "',Identity2='" + Identy2_Txt.Text + "',FAIncome=" + Father_Income_Txt.Text + ",MAIncome=" + Mother_Income_Txt.Text + ",photo=@photo where Admission_No='" + Admission_No_CBox.Text + "'";
                    cmd = new SqlCommand(query, con);
                    conv_photo();
                    con.Open();
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Updated Successfully");
                    con.Close();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Fill All the Fields!!!");
            }
        }

        private void Delete_Btn_Click(object sender, EventArgs e)
        {
            if (Admission_No_CBox.Text != "" && Std_Name_Txt.Text != "" && Father_Name_Txt.Text != "" && Mother_Name_Txt.Text != "" && Dob_Dtp.Text != "" && Gender_CBox.Text != "" && Address_Txt.Text != "" && Father_Occ_Txt.Text != "" && Mother_Occ_Txt.Text != "" && PStudy_CBox.Text != "" && Class_CBox.Text != "" && Father_Mob_Txt.Text != "" && Nationality_Txt.Text != "" && Email_Txt.Text != "" && Religion_CBox.Text != "" && Community_CBox.Text != "" && Caste_Txt.Text != "" && Identy1_Txt.Text != "" && Identy2_Txt.Text != "" && Father_Income_Txt.Text != "" && Mother_Income_Txt.Text != "" && Admis_Date_Txt.Text != "")
            {
                try
                {
                    query = "delete Student_Personal_Details_Master_Table where Admission_No='" + Admission_No_CBox.Text + "'";
                    cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Deleted Successfully");
                    con.Close();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Fill All the Fields!!!");
            }
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Clear_Controls();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        
        private void Admission_No_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Admis_Date,Group_Code,Branch,Std_Name from Student_Admission_Master_Table where Admission_No='" + Admission_No_CBox.Text + "'";
                con.Open();
                cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admis_Date_Txt.Text = dr["Admis_Date"].ToString().Trim();                    
                    Group_Code_Txt.Text = dr["Group_Code"].ToString();
                    Branch_Txt.Text = dr["Branch"].ToString();
                    Std_Name_Txt.Text = dr["Std_Name"].ToString();  
                }
                con.Close();                
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Sec_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Admission_No_CBox();    
        }

        private void Browse_Btn_Click(object sender, EventArgs e)
        {
            OpenFileDialog fdlg = new OpenFileDialog();
            fdlg.Filter = "jpeg|*.jpg|bmp|*.bmp|all files|*.*";
            DialogResult res = fdlg.ShowDialog();
            if (res == DialogResult.OK)
            {
                Std_Image_PBox.Image = Image.FromFile(fdlg.FileName);
            }           
        }

        private void PStudy_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (PStudy_CBox.SelectedItem.ToString() == "NO")
            {
                School_Name_Txt.Text = "NIL";
                PClass_CBox.Text = "NIL";
            }
            else
            {
                School_Name_Txt.Text = "";
                PClass_CBox.Text = "";
            }
        }

        private void Std_Name_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsLetter(e.KeyChar))
            {
                e.Handled = true;
            }
            if (char.IsLetter(e.KeyChar) || e.KeyChar == (char)Keys.Back || e.KeyChar == (char)Keys.Space)
            {
                e.Handled = false;
            }
            else
            {
                e.Handled = true;
                MessageBox.Show("Plz Enter Character Only");
                Std_Name_Txt.Focus();
            }
        }    
               
        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
        }

        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Sec_CBox.Focus();
                }
            }
        }

        private void Sec_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Sec_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Admission_No_CBox.Focus();
                }
            }
        }

        private void Admission_No_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Admission_No_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Father_Name_Txt.Focus();
                }
            }
        }

        private void Father_Name_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Father_Name_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Mother_Name_Txt.Focus();
                }
            }
        }

        private void Mother_Name_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Mother_Name_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Dob_Dtp.Focus();
                }
            }
        }

        private void Dob_Dtp_KeyDown(object sender, KeyEventArgs e)
        {
            if (Dob_Dtp.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Gender_CBox.Focus();
                }
            }
        }

        private void Gender_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Gender_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Nationality_Txt.Focus();
                }
            }
        }

        private void Nationality_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Address_Txt.Focus();
                }
            }
        }

        private void Address_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Address_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Religion_CBox.Focus();
                }
            }
        }

        private void Religion_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Religion_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Community_CBox.Focus();
                }
            }
        }

        private void Community_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Community_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Caste_Txt.Focus();
                }
            }
        }

        private void Caste_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Email_Txt.Focus();
                }
            }
        }

        private void Email_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Email_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Father_Mob_Txt.Focus();
                }
            }
        }

        private void Father_Mob_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Father_Mob_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Mother_Mob_Txt.Focus();
                }
            }
        }

        private void Mother_Mob_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Identy1_Txt.Focus();
                }
            }
        }

        private void Identy1_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Identy1_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Identy2_Txt.Focus();
                }
            }
        }

        private void Identy2_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Identy2_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Father_Occ_Txt.Focus();
                }
            }
        }

        private void Father_Occ_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Father_Occ_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Father_Income_Txt.Focus();
                }
            }
        }

        private void Father_Income_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Father_Income_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Mother_Occ_Txt.Focus();
                }
            }
        }

        private void Mother_Occ_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Mother_Occ_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Mother_Income_Txt.Focus();
                }
            }
        }

        private void Mother_Income_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Mother_Income_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Browse_Btn.Focus();
                }
            }
        }

        private void PStudy_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (PStudy_CBox.Text != "")
            {
                if (PStudy_CBox.Text.Trim() == "No")
                {
                    if (e.KeyCode == Keys.Enter)
                    {
                        try
                        {
                            if (Delete_Btn.Enabled == true)
                            {
                                Updat();
                            }
                            else
                            {
                                Add();
                            }
                            Class_CBox.Focus();
                        }
                        catch (Exception Ex)
                        {
                            MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        }
                    }
                }
                else
                {
                    if (e.KeyCode == Keys.Enter)
                    {
                        School_Name_Txt.Focus();
                    }
                }
            }
        }

        private void School_Name_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (School_Name_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    PClass_CBox.Focus();
                }
            }
        }

        private void PClass_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (PClass_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    try
                    {
                        if (Delete_Btn.Enabled == true)
                        {
                            Updat();
                        }
                        else
                        {
                            Add();
                        }
                        Class_CBox.Focus();
                    }
                    catch (Exception Ex)
                    {
                        MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }                
            }
        }

        private void Browse_Btn_KeyDown(object sender, KeyEventArgs e)
        {
            if (Browse_Btn.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    PStudy_CBox.Focus();
                }
            }
        }

        private void Update_Btn_Click(object sender, EventArgs e)
        {
            Updat();
        }

        private void Save_Btn_Click(object sender, EventArgs e)
        {
            Add();
        }

        private void Father_Income_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;

            }
            else
            {
                e.Handled = true;
            }
        }

        private void Mother_Income_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;

            }
            else
            {
                e.Handled = true;
            }
        }

        private void Father_Mob_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;

            }
            else
            {
                e.Handled = true;
            }
        }

        private void Mother_Mob_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;

            }
            else
            {
                e.Handled = true;
            }
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }       
       
    }
}
