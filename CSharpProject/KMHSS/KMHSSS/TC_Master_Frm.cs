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
    public partial class TC_Master_Frm : Form
    {
        string query;
        int syr = 0, eyr = 0, psyr = 0, peyr = 0,last=0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public TC_Master_Frm()
        {
            InitializeComponent();
        }

        private void TC_Master_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                SYear_CBox.Focus();
                fill_Class_CBox();
                fill_AYear_CBox();               
                Auto_Num();
                Fill_Grid();   
                TC_Date_Dtp.Value = DateTime.Now;
                Apply_Date_Dtp.Value  = DateTime.Now;
                Confirm_Date_Dtp.Value  = DateTime.Now;
                Issue_Date_Dtp.Value  = DateTime.Now;
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

       
        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select TC_Id from TC_Master_Table", con);
                String TC_Id = "TC";
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        TC_Id = dr[0].ToString();
                        TC_Id = TC_Id.Replace("TC", "");
                        int no = Convert.ToInt32(TC_Id);
                        no++;
                        TC_Id = "TC" + no.ToString();
                    }
                }
                else
                {
                    TC_Id = "TC101";
                }
                TC_Id_Txt.Text = TC_Id;
                dr.Close();
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
                query = "select row_number() over(order by TC_Id) as SNo,* from TC_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_TC_Issue_Details_dataGridView1.DataSource = dt;
                Student_TC_Issue_Details_dataGridView1.Columns[0].HeaderText = "SNo";
                Student_TC_Issue_Details_dataGridView1.Columns[1].HeaderText = "Id";
                Student_TC_Issue_Details_dataGridView1.Columns[2].HeaderText = "Date";
                Student_TC_Issue_Details_dataGridView1.Columns[3].HeaderText = "SYear";
                Student_TC_Issue_Details_dataGridView1.Columns[4].HeaderText = "EYear";
                Student_TC_Issue_Details_dataGridView1.Columns[5].HeaderText = "Class";
                Student_TC_Issue_Details_dataGridView1.Columns[6].HeaderText = "Section";
                Student_TC_Issue_Details_dataGridView1.Columns[7].HeaderText = "Student Name";
                Student_TC_Issue_Details_dataGridView1.Columns[8].HeaderText = "Admis No";
                Student_TC_Issue_Details_dataGridView1.Columns[9].HeaderText = "Group Code";
                Student_TC_Issue_Details_dataGridView1.Columns[10].HeaderText = "Apply Date";
                Student_TC_Issue_Details_dataGridView1.Columns[11].HeaderText = "Confirm Date";
                Student_TC_Issue_Details_dataGridView1.Columns[12].HeaderText = "Issue Date";
                Student_TC_Issue_Details_dataGridView1.Columns[0].Width = 150;
                Student_TC_Issue_Details_dataGridView1.Columns[1].Width = 150;
                Student_TC_Issue_Details_dataGridView1.Columns[2].Width = 150;
                Student_TC_Issue_Details_dataGridView1.Columns[3].Width = 150;
                Student_TC_Issue_Details_dataGridView1.Columns[4].Width = 150;
                Student_TC_Issue_Details_dataGridView1.Columns[5].Width = 150;
                Student_TC_Issue_Details_dataGridView1.Columns[6].Width = 150;
                Student_TC_Issue_Details_dataGridView1.Columns[7].Width = 350;
                Student_TC_Issue_Details_dataGridView1.Columns[8].Width = 150;
                Student_TC_Issue_Details_dataGridView1.Columns[9].Width = 150;
                Student_TC_Issue_Details_dataGridView1.Columns[10].Width = 200;
                Student_TC_Issue_Details_dataGridView1.Columns[11].Width = 200;
                Student_TC_Issue_Details_dataGridView1.Columns[12].Width = 200;
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
                TC_Id_Txt.Text = "";
                TC_Date_Dtp.Text = "";
                SYear_CBox.Text = "";
                EYear_Txt.Text = "";
                Class_CBox.Text = "";
                Sec_CBox.Text = "";
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                Group_Code_Txt.Text = "NIL";
                Apply_Date_Dtp.Text = "";
                Confirm_Date_Dtp.Text = "";
                Issue_Date_Dtp.Text = "";
                Auto_Num();
                SYear_CBox.Focus();         
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }             
            

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Clear_Controls();
                Auto_Num();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
      
        private void Confirm_Tc_Btn_Click(object sender, EventArgs e)
        {

            DialogResult res = MessageBox.Show("Do You Want to Issue TC?", "Save", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                if (TC_Id_Txt.Text != "" && TC_Date_Dtp.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "")
                {
                    try
                    {
                        query = "Select * From TC_Master_Table Where SYear='"+SYear_CBox.Text.ToString().Trim()+"' and EYear='"+EYear_Txt.Text.ToString().Trim()+"' and Std_Name='" + Student_Name_CBox.Text.ToString().Trim() + "' and Class='" + Class_CBox.Text.ToString().Trim() + "' and Section='" + Sec_CBox.Text.ToString().Trim() + "' and Group_Code='" + Group_Code_Txt.Text.ToString().Trim() + "'";
                        SqlCommand cmd = new SqlCommand(query, con);
                        con.Open();
                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr.HasRows)
                        {
                            MessageBox.Show(" TC Has Been Already Issued");
                        }
                        else
                        {
                            dr.Close();
                            query = "insert into TC_Master_Table values('" + TC_Id_Txt.Text.Trim() + "','" + TC_Date_Dtp.Text.Trim() + "','"+SYear_CBox.Text.Trim() +"','"+EYear_Txt.Text.Trim() +"','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + Group_Code_Txt.Text.Trim() + "','" + Apply_Date_Dtp.Text.Trim() + "','" + Confirm_Date_Dtp.Text.Trim() + "','" + Issue_Date_Dtp.Text.Trim() + "')";
                            cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            MessageBox.Show("TC Has Been Issued Successfully", "Alert");
                        }
                        con.Close();
                        cmd.Cancel();
                        query = "delete Student_Admission_Master_Table where Admission_No='" + Admis_No_Txt.Text + "'";
                        cmd = new SqlCommand(query, con);
                        con.Open();
                        cmd.ExecuteNonQuery();                        
                        con.Close();
                        Auto_Num();
                        Fill_Grid();
                    }
                    catch (Exception Ex)
                    {
                        MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }               
                
                Fill_Grid();
                Clear_Controls();
                }
                else
                {
                    MessageBox.Show("Please Fill All the Fields!!!");
                }                               

            }
            else
            {
                MessageBox.Show("Plz Check the Details");
            }            
        }
       
        private void Student_Name_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Admission_No,Group_Code from Student_Admission_Master_Table where Std_Name='" + Student_Name_CBox.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admis_No_Txt.Text = dr["Admission_No"].ToString().Trim();
                    Group_Code_Txt.Text = dr["Group_Code"].ToString().Trim();                    
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
            Fill_Std_Name();
        }

        public void Fill_Std_Name()
        {
            try
            {
                if (SYear_CBox.Text != "" && EYear_Txt.Text != "")
                {
                    if (Promotion_TC_RBtn.Checked == true)
                    {
                        Student_Name_CBox.Items.Clear();
                        Student_Name_CBox.Text = "";
                        Admis_No_Txt.Text = "";
                        query = "select Std_Name from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                        con.Open();
                        SqlCommand cmd = new SqlCommand(query, con);
                        SqlDataReader dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {
                            Student_Name_CBox.Items.Add(dr["Std_Name"].ToString());
                        }
                        dr.Close();
                        con.Close();
                    }
                    else
                    {
                        Student_Name_CBox.Items.Clear();
                        Student_Name_CBox.Text = "";
                        Admis_No_Txt.Text = "";
                        query = "select Std_Name from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                        con.Open();
                        SqlCommand cmd = new SqlCommand(query, con);
                        SqlDataReader dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {
                            Student_Name_CBox.Items.Add(dr["Std_Name"].ToString());
                        }
                        dr.Close();
                        con.Close();
                    }
                }
                else
                {
                    MessageBox.Show("Please Choose Academy Year");
                }
                      
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                fill_Section_CBox();
                Fill_Std_Name();                
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
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
                    Student_Name_CBox.Focus();
                }
            }
        }

        private void Student_Name_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Student_Name_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Apply_Date_Dtp.Focus();
                }
            }
        }

        private void Apply_Date_Dtp_KeyDown(object sender, KeyEventArgs e)
        {
            if (Apply_Date_Dtp.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Confirm_Date_Dtp.Focus();
                }
            }
        }

        private void Confirm_Date_Dtp_KeyDown(object sender, KeyEventArgs e)
        {
            if (Confirm_Date_Dtp.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Confirm_Tc_Btn.Focus();
                }
            }
        }
       
        private void SYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_CBox.Text != "")
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
            Fill_Std_Name();
        }

        private void Promotion_TC_RBtn_CheckedChanged(object sender, EventArgs e)
        {
            SYear_CBox.Focus();
        }

        private void Discontinue_TC_RBtn_CheckedChanged(object sender, EventArgs e)
        {
            SYear_CBox.Text = "";
            EYear_Txt.Text = "";
            Class_CBox.Text = "";
            Sec_CBox.Text = "";
            Student_Name_CBox.Text = "";
            Admis_No_Txt.Text = "";
            Group_Code_Txt.Text = "NIL";
            SYear_CBox.Focus();
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }
       
    }
}
