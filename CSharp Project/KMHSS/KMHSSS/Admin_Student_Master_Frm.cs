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
    public partial class Admin_Student_Master_Frm : Form
    {
        string query, query1, query2,query3,query4,query5,query6,query7, strsamid;
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Admin_Student_Master_Frm()
        {
            InitializeComponent();
        }

        private void Admin_Student_Master_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                Auto_Num();
                Concession_Amt_Txt.Enabled = false;
                Exemption_CBox.SelectedIndex = 1;
                Login_Check();
                fill_Class_CBox();
                fill_AYear_CBox();
                Admission_No_Txt.Focus();
                Admis_Date_Dtp.Value = DateTime.Now;
                Delete_Btn.Enabled = false;
                Van_CBox.Visible = false;
                Van_Lbl.Visible = false;
                Place_Lbl.Visible = false;
                Place_CBox.Visible = false;
                Trip_Lbl.Visible = false;
                Trip_Type_CBox.Visible = false;
                Main_Type_Lbl.Visible = false;
                SMonth_Lbl.Visible = false;
                SMonth_CBox.Visible=false;
                EMonth_Lbl.Visible = false;
                EMonth_CBox.Visible = false;
                Maintance_Type_CBox.Visible = false;
                Bill_Type_Lbl.Visible = false;
                Bill_Type_CBox.Visible = false;
                Exemp_Term_Lbl.Visible = false;
                Exemp_Term_CBox.Visible = false;
                Exemp_Month_Lbl.Visible = false;
                Exemp_Month_CBox.Visible = false;
                Van_No_Lbl.Visible = false;
                Van_Number_CBox.Visible = false;                
                Concession_Amt_Txt.Text = "0";
                Exemp_Month_CBox.Text = "NIL";
                Van_Number_CBox.Text = "NIL";
                Exemp_Term_CBox.Text = "NIL";
                Bill_Type_CBox.Text = "NIL";
                SMonth_CBox.Text = "NIL";
                EMonth_CBox.Text = "NIL";               
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Login_Check()
        {

            try
            {
                con.Open();
                SqlDataAdapter da = new SqlDataAdapter("select * from Logined_Table where Logg_Id='1'", con);
                DataTable dt = new DataTable();
                da.Fill(dt);

                string st = dt.Rows[0].ItemArray[1].ToString();
                con.Close();

                if (st == "Admin")
                {
                    Admission_No_Txt.Focus();
                    Concession_Amt_Txt.Enabled = true;                    
                    Exemption_CBox.Enabled = true;
                    Update_Btn.Enabled = true;
                    Delete_Btn.Enabled = true;
                }
                else
                {
                    Update_Btn.Enabled = false;
                    Delete_Btn.Enabled = false;
                    Admission_No_Txt.Focus();
                    Concession_Amt_Txt.Enabled = false;                    
                    Exemption_CBox.Enabled = false;
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

        }

        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT COUNT(Admission_No) as Tot FROM Student_Admission_Master_Table", con);
                SqlDataReader dr;
                dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    string cc = dr[0].ToString();
                    if (cc == "")
                    {
                        Admission_No_Txt.Text = "1";
                    }
                    else
                    {
                        int i = Convert.ToInt32(dr["tot"]);
                        int s = 592;
                        int j = i + s + 1;
                        Admission_No_Txt.Text = j.ToString();

                    }
                }
                con.Close();
                Student_Name_Txt.Focus();

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
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_AYear_CBox()
        {
            try
            {
                SYear_CBox.Items.Clear();
                query = "select SYear from Academy_Year_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    SYear_CBox.Items.Add(dr["SYear"].ToString());
                }
                con.Close();
                last = SYear_CBox.Items.Count - 1;
                SYear_CBox.SelectedIndex = last;
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

        public void fill_Group_CBox()
        {
            try
            {
                Group_Code_CBox.Items.Clear();
                query = "select Group_Code,Branch from Group_Master_Table where Class='"+Class_CBox.Text +"'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Group_Code_CBox.Items.Add(dr["Group_Code"].ToString());
                    Branch_Txt.Text = dr["Branch"].ToString();
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Branch_CBox()
        {
            try
            {
                query = "select Branch from Group_Master_Table where Group_Code='"+Branch_Txt.Text +"'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Branch_Txt.Text = dr["Branch"].ToString();
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }       

        public void fill_Trip_Type_CBox()
        {
            try
            {
                Trip_Type_CBox.Items.Clear();
                query = "select Trip_Type from Trip_Type_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Trip_Type_CBox.Items.Add(dr["Trip_Type"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Van_No_CBox()
        {
            try
            {
                Van_Number_CBox.Items.Clear();
                query = "select Van_Number from Van_Number_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Van_Number_CBox.Items.Add(dr["Van_Number"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Main_Type_CBox()
        {
            try
            {
                Maintance_Type_CBox.Items.Clear();
                query = "select Main_Type from Maintance_Type_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Maintance_Type_CBox.Items.Add(dr["Main_Type"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Month_CBox()
        {
            try
            {
                SMonth_CBox.Items.Clear();
                EMonth_CBox.Items.Clear();
                Exemp_Month_CBox.Items.Clear();
                query = "select Month from Month_Master_Table where Class='"+Class_CBox.Text +"'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    SMonth_CBox.Items.Add(dr["Month"].ToString());
                    EMonth_CBox.Items.Add(dr["Month"].ToString());
                    Exemp_Month_CBox.Items.Add(dr["Month"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Term_CBox()
        {
            try
            {
                STerms_CBox.Items.Clear();
                ETerms_CBox.Items.Clear();
                Exemp_Term_CBox.Items.Clear();
                query = "select Term_Type from Term_Type_Master_Table where Class='" + Class_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    STerms_CBox.Items.Add(dr["Term_Type"].ToString());
                    ETerms_CBox.Items.Add(dr["Term_Type"].ToString());
                    Exemp_Term_CBox.Items.Add(dr["Term_Type"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Place_CBox()
        {
            try
            {
                Place_CBox.Items.Clear();
                query = "select Place from Place_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Place_CBox.Items.Add(dr["Place"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid()
        {
            try
            {
                query = "select row_number() over(order by Admission_No) as SNo,* from Student_Admission_Master_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_Master_dataGridView1.DataSource = dt;
                Student_Admission_Master_dataGridView1.Columns[0].HeaderText = "SNo";
                Student_Admission_Master_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_Master_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_Master_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_Master_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_Master_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_Master_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_Master_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_Master_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_Master_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_Master_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_Master_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_Master_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_Master_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_Master_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_Master_dataGridView1.Columns[15].HeaderText = "Van Number";
                Student_Admission_Master_dataGridView1.Columns[16].HeaderText = "Main Type";
                Student_Admission_Master_dataGridView1.Columns[17].HeaderText = "SMonth";
                Student_Admission_Master_dataGridView1.Columns[18].HeaderText = "EMonth";
                Student_Admission_Master_dataGridView1.Columns[19].HeaderText = "STerm";
                Student_Admission_Master_dataGridView1.Columns[20].HeaderText = "ETerm";
                Student_Admission_Master_dataGridView1.Columns[21].HeaderText = "Concession";
                Student_Admission_Master_dataGridView1.Columns[22].HeaderText = "Exemption";
                Student_Admission_Master_dataGridView1.Columns[0].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[1].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[2].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[3].Width = 300;
                Student_Admission_Master_dataGridView1.Columns[4].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[5].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[6].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[7].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[8].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[9].Width = 300;
                Student_Admission_Master_dataGridView1.Columns[10].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[11].Width = 200;
                Student_Admission_Master_dataGridView1.Columns[12].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[13].Width = 300;
                Student_Admission_Master_dataGridView1.Columns[14].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[15].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[16].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[17].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[18].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[19].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[20].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[21].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[22].Width = 150;                
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }


        public void Fill_GridO()
        {
            try
            {
                query = "select row_number() over(order by Admission_No) as SNo,* from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_Master_dataGridView1.DataSource = dt;
                Student_Admission_Master_dataGridView1.Columns[0].HeaderText = "SNo";
                Student_Admission_Master_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_Master_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_Master_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_Master_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_Master_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_Master_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_Master_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_Master_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_Master_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_Master_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_Master_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_Master_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_Master_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_Master_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_Master_dataGridView1.Columns[15].HeaderText = "Van Number";
                Student_Admission_Master_dataGridView1.Columns[16].HeaderText = "Main Type";
                Student_Admission_Master_dataGridView1.Columns[17].HeaderText = "SMonth";
                Student_Admission_Master_dataGridView1.Columns[18].HeaderText = "EMonth";
                Student_Admission_Master_dataGridView1.Columns[19].HeaderText = "STerm";
                Student_Admission_Master_dataGridView1.Columns[20].HeaderText = "ETerm";
                Student_Admission_Master_dataGridView1.Columns[21].HeaderText = "Concession";
                Student_Admission_Master_dataGridView1.Columns[22].HeaderText = "Exemption";
                Student_Admission_Master_dataGridView1.Columns[0].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[1].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[2].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[3].Width = 300;
                Student_Admission_Master_dataGridView1.Columns[4].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[5].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[6].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[7].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[8].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[9].Width = 300;
                Student_Admission_Master_dataGridView1.Columns[10].Width = 120;
                Student_Admission_Master_dataGridView1.Columns[11].Width = 200;
                Student_Admission_Master_dataGridView1.Columns[12].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[13].Width = 300;
                Student_Admission_Master_dataGridView1.Columns[14].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[15].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[16].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[17].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[18].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[19].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[20].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[21].Width = 150;
                Student_Admission_Master_dataGridView1.Columns[22].Width = 150;
                Delete_Btn.Enabled = false;
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
                Admission_No_Txt.Text = "";
                Admis_Date_Dtp.Text = "";
                Student_Name_Txt.Text = "";
                Class_CBox.Text = "";
                Sec_CBox.Text = "";
                Group_Code_CBox.Text = "";
                Branch_Txt.Text = "";
                Gender_CBox.Text = "";
                Accomm_Type_CBox.Text = "";
                Van_CBox.Text = "";
                Place_CBox.Text = "NIL";
                Trip_Type_CBox.Text = "NIL";
                Van_Number_CBox.Text = "NIL";
                Maintance_Type_CBox.Text = "NIL";
                SMonth_CBox.Text = "NIL";
                STerms_CBox.Text = "";
                Concession_Amt_Txt.Text = "0";
                SYear_CBox.Text = "";
                EYear_Txt.Text = "";
                EMonth_CBox.Text = "NIL";
                Exemption_CBox.SelectedIndex =1;
                ETerms_CBox.Text="";
                Exemption_CBox.Text = "";
                EMonth_Lbl.Visible = false;
                EMonth_CBox.Visible = false;
                Van_CBox.Visible = false;
                Van_Lbl.Visible = false;
                Place_Lbl.Visible = false;
                Place_CBox.Visible = false;
                Trip_Lbl.Visible = false;
                Trip_Type_CBox.Visible = false;
                Main_Type_Lbl.Visible = false;
                Maintance_Type_CBox.Visible = false;
                SMonth_CBox.Visible = false;
                SMonth_Lbl.Visible = false;
                Bill_Type_Lbl.Visible = false;
                Bill_Type_CBox.Visible = false;
                Exemp_Term_Lbl.Visible = false;
                Exemp_Term_CBox.Visible = false;
                Exemp_Month_Lbl.Visible = false;
                Exemp_Month_CBox.Visible = false;
                Van_No_Lbl.Visible = false;
                Van_Number_CBox.Visible = false;  
                Exemp_Month_CBox.Text = "NIL";
                Exemp_Term_CBox.Text = "NIL";
                Bill_Type_CBox.Text = "NIL";
                Van_Number_CBox.Text = "NIL";
                fill_AYear_CBox();
                Auto_Num();
                Admission_No_Txt.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Add()
        {
            if (Admission_No_Txt.Text != "" && Admis_Date_Dtp.Text != "" && Student_Name_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Accomm_Type_CBox.Text != "" && Gender_CBox.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "")
            {
                try
                {
                    query = "Select * From Student_Admission_Master_Table Where Admission_No='" + Admission_No_Txt.Text.ToString().Trim() + "' and SYear='"+SYear_CBox.Text.ToString().Trim()+"' and EYear='"+EYear_Txt.Text.ToString().Trim()+"' and Std_Name='" + Student_Name_Txt.Text.ToString().Trim() + "' and Class='" + Class_CBox.Text.ToString().Trim() + "' and Section='" + Sec_CBox.Text.ToString().Trim() + "' and Group_Code='" + Group_Code_CBox.Text.ToString().Trim() + "' and Branch='" + Branch_Txt.Text.ToString().Trim() + "' and Accomm_Type='" + Accomm_Type_CBox.Text.ToString().Trim() + "' and Gender='" + Gender_CBox.Text.ToString().Trim() + "' and Van='" + Van_CBox.Text.ToString().Trim() + "' and Place='" + Place_CBox.Text.ToString().Trim() + "' and Trip_Type='" + Trip_Type_CBox.Text.ToString().Trim() + "' and Main_Type='" + Maintance_Type_CBox.Text.ToString().Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Exist");
                        dr.Close();
                        con.Close();                        
                        Fill_Grid();
                        Clear_Controls();
                    }
                    else
                    {
                        dr.Close();
                        con.Close();
                        query = "insert into Student_Admission_Master_Table values('" + Admission_No_Txt.Text.Trim() + "','" + Admis_Date_Dtp.Text.Trim() + "','" + Student_Name_Txt.Text.Trim() + "','"+SYear_CBox.Text.Trim() +"','"+EYear_Txt.Text.Trim() +"','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Group_Code_CBox.Text.Trim() + "','" + Branch_Txt.Text.Trim() + "','" + Gender_CBox.Text.Trim() + "','" + Accomm_Type_CBox.Text.Trim() + "','" + Van_CBox.Text.Trim() + "','" + Place_CBox.Text.Trim() + "','" + Trip_Type_CBox.Text.Trim() + "','"+Van_Number_CBox.Text+"','" + Maintance_Type_CBox.Text.Trim() + "','" + SMonth_CBox.Text.Trim() + "','"+EMonth_CBox.Text.Trim()+"','" + STerms_CBox.Text.Trim() + "','"+ETerms_CBox.Text.Trim()+"'," + Concession_Amt_Txt.Text.Trim() + ",'"+Exemption_CBox.Text+"','"+Bill_Type_CBox.Text+"','"+Exemp_Term_CBox.Text+"','"+Exemp_Month_CBox.Text+"')";
                        cmd = new SqlCommand(query, con);
                        con.Open();
                        cmd.ExecuteNonQuery();
                        MessageBox.Show("Inserted Successfully");
                        con.Close();
                        Fill_Grid();                        

                        if (Accomm_Type_CBox.Text == "HOSTEL")
                        {
                            try
                            {
                                con.Open();
                                query = "insert into Pending_Payment_Table values('" + Admission_No_Txt.Text.Trim() + "','"+SYear_CBox.Text.Trim()+"','"+EYear_Txt.Text.Trim()+"',1,1,0,1,1,1,0,1)";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                con.Close();
                            }
                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }                      
                        else if (Accomm_Type_CBox.Text == "DAYS SCHOLAR" && Van_CBox.Text == "YES")
                        {
                            try
                            {
                                con.Open();
                                query = "insert into Pending_Payment_Table values('" + Admission_No_Txt.Text.Trim() + "','" + SYear_CBox.Text.Trim() + "','" + EYear_Txt.Text.Trim() + "',1,0,1,1,1,0,1,1)";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (Accomm_Type_CBox.Text == "DAYS SCHOLAR" && Van_CBox.Text == "NO")
                        {
                            try
                            {
                                con.Open();
                                query = "insert into Pending_Payment_Table values('" + Admission_No_Txt.Text.Trim() + "','" + SYear_CBox.Text.Trim() + "','" + EYear_Txt.Text.Trim() + "',1,0,0,1,1,0,0,1)";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                con.Close();
                            }
                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }

                        if (Exemption_CBox.Text == "YES")
                        {
                            if (Bill_Type_CBox.Text == "SCHOOL BILL" && Exemp_Term_CBox.Text == "NIL")
                            {
                                try
                                {

                                    con.Open();
                                    query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admission_No_Txt.Text + "'";
                                    cmd = new SqlCommand(query, con);
                                    cmd.ExecuteNonQuery();
                                    // MessageBox.Show("Inserted Successfully");
                                    con.Close();
                                }

                                catch (Exception Ex)
                                {
                                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                                }
                            }
                            else if (Bill_Type_CBox.Text == "HOSTEL BILL" && Exemp_Term_CBox.Text == "NIL")
                            {
                                try
                                {

                                    con.Open();
                                    query = "Update Pending_Payment_Table set HostelBillPay='0' where Admission_No='" + Admission_No_Txt.Text + "'";
                                    cmd = new SqlCommand(query, con);
                                    cmd.ExecuteNonQuery();
                                    // MessageBox.Show("Inserted Successfully");
                                    con.Close();
                                }

                                catch (Exception Ex)
                                {
                                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                                }
                            }
                            else if (Bill_Type_CBox.Text == "VAN BILL" && Exemp_Term_CBox.Text == "NIL")
                            {
                                try
                                {

                                    con.Open();
                                    query = "Update Pending_Payment_Table set VanBillPay='0' where Admission_No='" + Admission_No_Txt.Text + "'";
                                    cmd = new SqlCommand(query, con);
                                    cmd.ExecuteNonQuery();
                                    // MessageBox.Show("Inserted Successfully");
                                    con.Close();
                                }

                                catch (Exception Ex)
                                {
                                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                                }
                            }
                            else if (Bill_Type_CBox.Text == "STATIONARY BILL" && Exemp_Term_CBox.Text == "NIL")
                            {
                                try
                                {

                                    con.Open();
                                    query = "Update Pending_Payment_Table set StationaryBillPay='0' where Admission_No='" + Admission_No_Txt.Text + "'";
                                    cmd = new SqlCommand(query, con);
                                    cmd.ExecuteNonQuery();
                                    // MessageBox.Show("Inserted Successfully");
                                    con.Close();
                                }

                                catch (Exception Ex)
                                {
                                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                                }
                            }
                        }
                    }                    
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
                Admission_No_Txt.Focus();
                Clear_Controls();
                Fill_Grid();
            }
            else
            {
                MessageBox.Show("Please Fill All the Fields!!!");
            }
           
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (Class_CBox.Text != "" && Sec_CBox.Text != "" && SYear_CBox.Text != "")
                {
                    Fill_GridO();
                }
                else
                {
                    MessageBox.Show("Please Select Class,Section and Year");
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Updat()
        {
            if (Admission_No_Txt.Text != "" && Admis_Date_Dtp.Text != "" && Student_Name_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Accomm_Type_CBox.Text != "" && Gender_CBox.Text != "" && SYear_CBox.Text!="" && EYear_Txt.Text!="")
            {

                query = "update Student_Admission_Master_Table set Std_Name='" + Student_Name_Txt.Text.Trim() + "',Class='" + Class_CBox.Text.Trim() + "',Section='" + Sec_CBox.Text.Trim() + "',Group_Code='" + Group_Code_CBox.Text.Trim() + "',Branch='" + Branch_Txt.Text.Trim() + "',Gender='" + Gender_CBox.Text.Trim() + "',Accomm_Type='" + Accomm_Type_CBox.Text.Trim() + "',Van='" + Van_CBox.Text.Trim() + "',Place='" + Place_CBox.Text.Trim() + "',Trip_Type='" + Trip_Type_CBox.Text.Trim() + "',Van_Number='"+Van_Number_CBox.Text+"',Main_Type='" + Maintance_Type_CBox.Text.Trim() + "',SMonth='" + SMonth_CBox.Text.Trim() + "',EMonth='" + EMonth_CBox.Text.Trim() + "',STerm='" + STerms_CBox.Text.Trim() + "',ETerm='" + ETerms_CBox.Text.Trim() + "',Concession_Amt=" + Concession_Amt_Txt.Text.Trim() + ",Exemption='"+Exemption_CBox.Text+"',Bill_Type='"+Bill_Type_CBox.Text+"',Exemp_Term='"+Exemp_Term_CBox.Text+"',Exemp_Month='"+Exemp_Month_CBox.Text+"' where Admission_No='" + Admission_No_Txt.Text.Trim() + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                query1 = "update School_Bill_Master_Table set Std_Name='" + Student_Name_Txt.Text.Trim() + "',Class='" + Class_CBox.Text.Trim() + "',Section='" + Sec_CBox.Text.Trim() + "' where Admission_No='" + Admission_No_Txt.Text.Trim() + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                query2 = "update Hostel_Bill_Master_Table set Std_Name='" + Student_Name_Txt.Text.Trim() + "',Class='" + Class_CBox.Text.Trim() + "',Section='" + Sec_CBox.Text.Trim() + "',SMonth='" + SMonth_CBox.Text.Trim() + "' where Admission_No='" + Admission_No_Txt.Text.Trim() + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                query3 = "update Van_Bill_Master_Table set Std_Name='" + Student_Name_Txt.Text.Trim() + "',Class='" + Class_CBox.Text.Trim() + "',Section='" + Sec_CBox.Text.Trim() + "',SMonth='" + SMonth_CBox.Text.Trim() + "',Place='" + Place_CBox.Text.Trim() + "',Trip_Type='" + Trip_Type_CBox.Text.Trim() + "' where Admission_No='" + Admission_No_Txt.Text.Trim() + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                query4 = "update Stationary_Bill_Master_Table set Std_Name='" + Student_Name_Txt.Text.Trim() + "',Class='" + Class_CBox.Text.Trim() + "',Section='" + Sec_CBox.Text.Trim() + "' where Admission_No='" + Admission_No_Txt.Text.Trim() + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                query5 = "update Other_School_Bill_Master_Table set Std_Name='" + Student_Name_Txt.Text.Trim() + "',Class='" + Class_CBox.Text.Trim() + "',Section='" + Sec_CBox.Text.Trim() + "' where Admission_No='" + Admission_No_Txt.Text.Trim() + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                query6 = "update Other_Hostel_Bill_Master_Table set Std_Name='" + Student_Name_Txt.Text.Trim() + "',Class='" + Class_CBox.Text.Trim() + "',Section='" + Sec_CBox.Text.Trim() + "',Main_Type='" + Maintance_Type_CBox.Text.Trim() + "' where Admission_No='" + Admission_No_Txt.Text.Trim() + "'";
                query7 = "update Student_Contact_Details_Table set Std_Name='" + Student_Name_Txt.Text.Trim() + "',Class='" + Class_CBox.Text.Trim() + "',Section='" + Sec_CBox.Text.Trim() + "' where Admission_No='" + Admission_No_Txt.Text.Trim() + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                SqlCommand cmd1 = new SqlCommand(query1, con);
                SqlCommand cmd2 = new SqlCommand(query2, con);
                SqlCommand cmd3 = new SqlCommand(query3, con);
                SqlCommand cmd4 = new SqlCommand(query4, con);
                SqlCommand cmd5 = new SqlCommand(query5, con);
                SqlCommand cmd6 = new SqlCommand(query6, con);
                SqlCommand cmd7 = new SqlCommand(query7, con);
                con.Open();
                cmd.ExecuteNonQuery();
                cmd1.ExecuteNonQuery();
                cmd2.ExecuteNonQuery();
                cmd3.ExecuteNonQuery();
                cmd4.ExecuteNonQuery();
                cmd5.ExecuteNonQuery();
                cmd6.ExecuteNonQuery();
                cmd7.ExecuteNonQuery();
                MessageBox.Show("Updated Successfully");
                con.Close();
                Fill_Grid();

                if (Accomm_Type_CBox.Text == "HOSTEL")
                {
                    try
                    {
                        con.Open();
                        query = "update Pending_Payment_Table set HostelBill=1,VanBill=0,HostelBillPay=1,VanBillPay=0 where Admission_No='" + Admission_No_Txt.Text + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        // MessageBox.Show("Updated Successfully");
                        con.Close();
                    }
                    catch (Exception Ex)
                    {
                        MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }        
                else if (Accomm_Type_CBox.Text == "DAYS SCHOLAR" && Van_CBox.Text == "YES")
                {
                    try
                    {
                        con.Open();
                        query = "update Pending_Payment_Table set HostelBill=0,VanBill=1,HostelBillPay=0,VanBillPay=1 where Admission_No='" + Admission_No_Txt.Text + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        // MessageBox.Show("Updated Successfully");
                        con.Close();
                    }

                    catch (Exception Ex)
                    {
                        MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
                else if (Accomm_Type_CBox.Text == "DAYS SCHOLAR" && Van_CBox.Text == "NO")
                {
                    try
                    {
                        con.Open();
                        query = "update Pending_Payment_Table set HostelBill=0,VanBill=0,HostelBillPay=0,VanBillPay=0 where Admission_No='" + Admission_No_Txt.Text + "' and SYear='" + SYear_CBox.Text.Trim() + "' and EYear='" + EYear_Txt.Text.Trim() + "'";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        // MessageBox.Show("Updated Successfully");
                        con.Close();
                    }

                    catch (Exception Ex)
                    {
                        MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }

                if (Exemption_CBox.Text == "YES")
                {
                    if (Bill_Type_CBox.Text == "SCHOOL BILL" && Exemp_Term_CBox.Text == "NIL")
                    {
                        try
                        {

                            con.Open();
                            query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admission_No_Txt.Text + "'";
                            cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            // MessageBox.Show("Inserted Successfully");
                            con.Close();
                        }

                        catch (Exception Ex)
                        {
                            MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        }
                    }
                    else if (Bill_Type_CBox.Text == "HOSTEL BILL" && Exemp_Term_CBox.Text == "NIL")
                    {
                        try
                        {

                            con.Open();
                            query = "Update Pending_Payment_Table set HostelBillPay='0' where Admission_No='" + Admission_No_Txt.Text + "'";
                            cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            // MessageBox.Show("Inserted Successfully");
                            con.Close();
                        }

                        catch (Exception Ex)
                        {
                            MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        }
                    }
                    else if (Bill_Type_CBox.Text == "VAN BILL" && Exemp_Term_CBox.Text == "NIL")
                    {
                        try
                        {

                            con.Open();
                            query = "Update Pending_Payment_Table set VanBillPay='0' where Admission_No='" + Admission_No_Txt.Text + "'";
                            cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            // MessageBox.Show("Inserted Successfully");
                            con.Close();
                        }

                        catch (Exception Ex)
                        {
                            MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        }
                    }
                    else if (Bill_Type_CBox.Text == "STATIONARY BILL" && Exemp_Term_CBox.Text == "NIL")
                    {
                        try
                        {

                            con.Open();
                            query = "Update Pending_Payment_Table set StationaryBillPay='0' where Admission_No='" + Admission_No_Txt.Text + "'";
                            cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            // MessageBox.Show("Inserted Successfully");
                            con.Close();
                        }

                        catch (Exception Ex)
                        {
                            MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        }
                    }
                }
                Clear_Controls();
            }

            else
            {
                MessageBox.Show("Please Fill All the Fields!!!");
            }
        }
       
        private void Delete_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Delete", "Delete", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                if (Admission_No_Txt.Text != "" && Admis_Date_Dtp.Text != "" && Student_Name_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Accomm_Type_CBox.Text != "" && Gender_CBox.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "")
                {
                    try
                    {
                        query = "delete Student_Admission_Master_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                        query1 = "delete Pending_Payment_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                        SqlCommand cmd = new SqlCommand(query, con);
                        SqlCommand cmd1 = new SqlCommand(query1, con);
                        con.Open();
                        cmd.ExecuteNonQuery();
                        cmd1.ExecuteNonQuery();
                        MessageBox.Show("Deleted Successfully");
                        con.Close();
                        Fill_Grid();
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
            else
            {
                MessageBox.Show("Please Check the Details!!!");
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

        private void Accomm_Type_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (Accomm_Type_CBox.SelectedItem.ToString() == "DAYS SCHOLAR")
            {
                Van_Lbl.Visible = true;
                Van_CBox.Visible = true;
                Main_Type_Lbl.Visible = false;
                Maintance_Type_CBox.Visible = false;
                Van_CBox.Text = "NO";
                Maintance_Type_CBox.Text = "NIL";
                SMonth_Lbl.Visible = false;
                SMonth_CBox.Visible = false;
                EMonth_Lbl.Visible = false;
                EMonth_CBox.Visible = false;
            }
            else
            {
                Main_Type_Lbl.Visible = true;
                Maintance_Type_CBox.Visible = true;
                Van_Lbl.Visible = false;
                Van_CBox.Visible = false;
                Van_CBox.Text = "NO";
                Place_CBox.Text = "NIL";
                Trip_Type_CBox.Text = "NIL";
                Van_Number_CBox.Text = "NIL";
                Place_Lbl.Visible = false;
                Place_CBox.Visible =false;
                Trip_Lbl.Visible = false;
                Trip_Type_CBox.Visible = false;
                Van_No_Lbl.Visible = false;
                Van_Number_CBox.Visible = false;  
                SMonth_Lbl.Visible = true;
                SMonth_CBox.Visible = true;
                EMonth_Lbl.Visible = true;
                EMonth_CBox.Visible = true;

            }
        }

        private void Van_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (Van_CBox.SelectedItem.ToString() == "YES")
            {
                Place_Lbl.Visible = true;
                Place_CBox.Visible = true;
                Trip_Lbl.Visible = true;
                Trip_Type_CBox.Visible = true;
                Van_No_Lbl.Visible = true;
                Van_Number_CBox.Visible = true;  
                SMonth_Lbl.Visible = true;
                SMonth_CBox.Visible = true;
                EMonth_Lbl.Visible = true;
                EMonth_CBox.Visible = true;
                Maintance_Type_CBox.Text = "NIL";
            }
            else
            {
                Place_Lbl.Visible = false;
                Place_CBox.Visible = false;
                Trip_Lbl.Visible = false;
                Trip_Type_CBox.Visible = false;
                Van_No_Lbl.Visible = false;
                Van_Number_CBox.Visible = false;  
                SMonth_Lbl.Visible = false ;
                SMonth_CBox.Visible = false ;
                EMonth_Lbl.Visible = false;
                EMonth_CBox.Visible = false;
                Maintance_Type_CBox.Text = "NIL";
                Place_CBox.Text = "NIL";
                Trip_Type_CBox.Text = "NIL";
                Van_Number_CBox.Text = "NIL";
                SMonth_CBox.Text = "NIL";
                EMonth_CBox.Text = "NIL";
            }
        }

        private void Concession_Amt_Txt_KeyPress(object sender, KeyPressEventArgs e)
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

       
        private void Group_Code_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Branch from Group_Master_Table where Group_Code='" + Group_Code_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                if (Group_Code_CBox.SelectedItem.ToString() == "NIL")
                {
                    Branch_Txt.Text = "NIL";
                }
                while (dr.Read())
                {
                    Branch_Txt.Text = dr["Branch"].ToString();
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Admission_No_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Admission_No_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    try
                    {
                        SqlConnection con1 = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
                        con1.Open();
                        query = "select * From Student_Admission_Master_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                        SqlCommand cmd = new SqlCommand(query, con1);
                        cmd.ExecuteNonQuery();
                        SqlDataReader dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {
                            Van_Lbl.Visible = true;
                            Van_CBox.Visible = true;
                            Place_Lbl.Visible = true;
                            Place_CBox.Visible = true;
                            Trip_Lbl.Visible = true;
                            Trip_Type_CBox.Visible = true;
                            Van_No_Lbl.Visible = true;
                            Van_Number_CBox.Visible = true;  
                            Main_Type_Lbl.Visible = true;
                            Maintance_Type_CBox.Visible = true;
                            SMonth_Lbl.Visible = true;
                            SMonth_CBox.Visible = true;
                            EMonth_Lbl.Visible = true;
                            EMonth_CBox.Visible = true;
                            Exemp_Term_Lbl.Visible = true;
                            Exemp_Term_CBox.Visible = true;
                            Exemp_Month_Lbl.Visible = true;
                            Exemp_Month_CBox.Visible = true;
                            Exemp_Month_CBox.Text = "NIL";
                            Exemp_Term_CBox.Text = "NIL";
                            Bill_Type_CBox.Text = "NIL";
                            Admis_Date_Dtp.Text = dr["Admis_Date"].ToString();
                            Student_Name_Txt.Text = dr["Std_Name"].ToString();
                            SYear_CBox.Text = dr["SYear"].ToString();
                            EYear_Txt.Text = dr["EYear"].ToString();
                            Class_CBox.Text = dr["Class"].ToString();
                            Sec_CBox.Text = dr["Section"].ToString();
                            Group_Code_CBox.Text = dr["Group_Code"].ToString();
                            Branch_Txt.Text = dr["Branch"].ToString();
                            Gender_CBox.Text = dr["Gender"].ToString();
                            Accomm_Type_CBox.Text = dr["Accomm_Type"].ToString();
                            Van_CBox.Text = dr["Van"].ToString().Trim();
                            Place_CBox.Text = dr["Place"].ToString();
                            Trip_Type_CBox.Text = dr["Trip_Type"].ToString();
                            Van_Number_CBox.Text = dr["Van_Number"].ToString();
                            Maintance_Type_CBox.Text = dr["Main_Type"].ToString();
                            SMonth_CBox.Text = dr["SMonth"].ToString();
                            EMonth_CBox.Text = dr["EMonth"].ToString();
                            STerms_CBox.Text = dr["STerm"].ToString();
                            ETerms_CBox.Text = dr["ETerm"].ToString();
                            Concession_Amt_Txt.Text = dr["Concession_Amt"].ToString();
                            Exemption_CBox.Text = dr["Exemption"].ToString();
                        }
                        dr.Close();
                        con1.Close();
                        Login_Check();
                    }
                    catch (Exception Ex)
                    {
                        MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                    Admis_Date_Dtp.Focus();
                }
            }

            if (Student_Name_Txt.Text=="")
            {
                Delete_Btn.Enabled = false;
            }
        }

        private void Admis_Date_Dtp_KeyDown(object sender, KeyEventArgs e)
        {
            if (Admis_Date_Dtp.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Student_Name_Txt.Focus();
                }
            }
        }

        private void Student_Name_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Student_Name_Txt.Text != "")
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
                    SYear_CBox.Focus();
                }
            }
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
                    Group_Code_CBox.Focus();
                }
            }
        }

        private void Group_Code_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Group_Code_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Branch_Txt.Focus();
                }
            }
        }

        private void Branch_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Branch_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                   Accomm_Type_CBox.Focus();
                }
            }
        }

        private void Accomm_Type_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Accomm_Type_CBox.Text != "")
            {
                if (Accomm_Type_CBox.Text == "DAYS SCHOLAR")
                {
                    if (e.KeyCode == Keys.Enter)
                    {
                        Van_CBox.Focus();
                    }
                }
                else
                {
                    if (e.KeyCode == Keys.Enter)
                    {
                        Maintance_Type_CBox.Focus();
                    }
                }
            }
        }

        private void Van_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Van_CBox.Text != "")
            {
                if (Van_CBox.Text == "YES")
                {
                    if (e.KeyCode == Keys.Enter)
                    {
                        Place_CBox.Focus();
                    }
                }
                else
                {
                    if (e.KeyCode == Keys.Enter)
                    {
                        STerms_CBox.Focus();
                    }
                }
            }
        }

        private void Place_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Place_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Trip_Type_CBox.Focus();
                }
            }
        }

        private void Trip_Type_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Trip_Type_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Van_Number_CBox.Focus();
                }
            }
        }

        private void Van_Number_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Van_Number_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    SMonth_CBox.Focus();
                }
            }
        } 

        private void Maintance_Type_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Maintance_Type_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    SMonth_CBox.Focus();
                }
            }
        }

        private void SMonth_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SMonth_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    EMonth_CBox.Focus();
                }                
            }
        }

        private void STerms_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (STerms_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    ETerms_CBox.Focus();
                }
                    
            }
        }

        private void Concession_Amt_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Concession_Amt_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Exemption_CBox.Focus();
                }
            }
        }

        private void Student_Admission_Master_dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                Van_Lbl.Visible = true;
                Van_CBox.Visible = true;
                Place_Lbl.Visible = true;
                Place_CBox.Visible = true;
                Trip_Lbl.Visible = true;
                Trip_Type_CBox.Visible = true;
                Van_No_Lbl.Visible = true;
                Van_Number_CBox.Visible = true;  
                Main_Type_Lbl.Visible = true;
                Maintance_Type_CBox.Visible = true;
                SMonth_Lbl.Visible = true;
                SMonth_CBox.Visible = true;
                EMonth_Lbl.Visible = true;
                EMonth_CBox.Visible = true;
                Bill_Type_Lbl.Visible = true;
                Bill_Type_CBox.Visible = true;
                Exemp_Term_Lbl.Visible = true;
                Exemp_Term_CBox.Visible = true;
                Exemp_Month_Lbl.Visible = true;
                Exemp_Month_CBox.Visible = true;
                Exemp_Month_CBox.Text = "NIL";
                Exemp_Term_CBox.Text = "NIL";
                Bill_Type_CBox.Text = "NIL";
                strsamid = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                Admission_No_Txt.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                Admis_Date_Dtp.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                Student_Name_Txt.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                SYear_CBox.Text  = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
                EYear_Txt.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[5].Value.ToString();
                Class_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[6].Value.ToString();
                Sec_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[7].Value.ToString();
                Group_Code_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[8].Value.ToString();
                Branch_Txt.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[9].Value.ToString();
                Gender_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[10].Value.ToString();
                Accomm_Type_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[11].Value.ToString();
                Van_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[12].Value.ToString();
                Place_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[13].Value.ToString();
                Trip_Type_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[14].Value.ToString();
                Van_Number_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[15].Value.ToString();
                Maintance_Type_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[16].Value.ToString();
                SMonth_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[17].Value.ToString();
                EMonth_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[18].Value.ToString();
                STerms_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[19].Value.ToString();
                ETerms_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[20].Value.ToString();
                Concession_Amt_Txt.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[21].Value.ToString();
                Exemption_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[22].Value.ToString();
                Bill_Type_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[23].Value.ToString();
                Exemp_Term_CBox.Text= Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[24].Value.ToString();
                Exemp_Month_CBox.Text = Student_Admission_Master_dataGridView1.Rows[e.RowIndex].Cells[25].Value.ToString();
                Login_Check();
                Admission_No_Txt.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
            fill_Group_CBox();
            fill_Month_CBox();
            fill_Place_CBox();
            fill_Term_CBox();
            fill_Trip_Type_CBox();
            fill_Van_No_CBox();
            fill_Main_Type_CBox();
        }

        private void Add_Btn_Click(object sender, EventArgs e)
        {
            Add();
        }

        private void Update_Btn_Click(object sender, EventArgs e)
        {
            Updat();
        }

        private void SYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_CBox.Text != "" && EYear_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Class_CBox.Focus();
                }
            }
        }

        private void SYear_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select EYear from Academy_Year_Master_Table where SYear='" + SYear_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    EYear_Txt.Text = dr["EYear"].ToString().Trim();
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Exemption_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    if (Delete_Btn.Enabled == false)
                    {
                        Add();
                        Admission_No_Txt.Focus();
                        Fill_Grid();
                    }
                    else
                    {
                        Updat();
                        Admission_No_Txt.Focus();
                        Fill_Grid();
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void EMonth_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (EMonth_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    STerms_CBox.Focus();
                }
            }
        }

        private void ETerms_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (ETerms_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Concession_Amt_Txt.Focus();
                }
            }
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Exemption_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (Exemption_CBox.Text == "YES")
            {
                Bill_Type_Lbl.Visible = true;
                Bill_Type_CBox.Visible = true;                
            }
            else
            {
                Bill_Type_Lbl.Visible = false;
                Bill_Type_CBox.Visible = false;
                Exemp_Term_Lbl.Visible = false;
                Exemp_Term_CBox.Visible = false;
                Exemp_Month_Lbl.Visible = false;
                Exemp_Month_CBox.Visible = false;
                Exemp_Month_CBox.Text = "NIL";
                Exemp_Term_CBox.Text = "NIL";
                Bill_Type_CBox.Text = "NIL";
            }
        }

        private void Bill_Type_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (Bill_Type_CBox.Text == "SCHOOL BILL")
            {
                Exemp_Term_Lbl.Visible = true;
                Exemp_Term_CBox.Visible = true;
                Exemp_Month_Lbl.Visible = false;
                Exemp_Month_CBox.Visible = false;
                Exemp_Term_CBox.Text = "NIL";
                Exemp_Month_CBox.Text = "NIL";
            }
            else if (Bill_Type_CBox.Text == "STATIONARY BILL")
            {
                Exemp_Term_Lbl.Visible = false;
                Exemp_Term_CBox.Visible = false;
                Exemp_Month_Lbl.Visible = false;
                Exemp_Month_CBox.Visible = false;
                Exemp_Month_CBox.Text = "NIL";
                Exemp_Term_CBox.Text = "NIL";
            }
            else
            {                
                Exemp_Month_Lbl.Visible =true;
                Exemp_Month_CBox.Visible = true;
                Exemp_Term_Lbl.Visible = false;
                Exemp_Term_CBox.Visible = false;
                Exemp_Term_CBox.Text = "NIL";
                Exemp_Month_CBox.Text = "NIL";
            }
        }        
    }
}
